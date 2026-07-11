import { NextResponse } from "next/server"
import {
  OAUTH_PROVIDERS,
  type OAuthProvider,
  appOrigin,
} from "@/lib/oauth"
import { oauthLogin } from "@/lib/api"

async function exchangeCode(
  provider: OAuthProvider,
  code: string,
  redirectUri: string,
  verifier: string,
): Promise<{ access_token: string }> {
  const cfg = OAUTH_PROVIDERS[provider]
  const clientId = process.env[cfg.clientIdEnv] ?? ""
  const clientSecret = process.env[cfg.clientSecretEnv] ?? ""

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  })
  if (clientSecret) body.set("client_secret", clientSecret)

  const res = await fetch(cfg.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  })
  if (!res.ok) {
    return Promise.reject(
      new Error(`Token exchange failed (${res.status})`),
    )
  }
  const data = (await res.json()) as { access_token: string }
  return data
}

async function fetchUserInfo(
  provider: OAuthProvider,
  accessToken: string,
): Promise<{ email: string; name?: string }> {
  const cfg = OAUTH_PROVIDERS[provider]
  const res = await fetch(cfg.userInfoUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) {
    return Promise.reject(new Error(`Userinfo failed (${res.status})`))
  }
  const data = (await res.json()) as Record<string, unknown>

  let email = (data[cfg.emailField] as string) || ""
  if (provider === "github" && !email) {
    const emailsRes = await fetch("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (emailsRes.ok) {
      const emails = (await emailsRes.json()) as Array<{
        email: string
        primary: boolean
        verified: boolean
      }>
      email =
        emails.find((e) => e.primary && e.verified)?.email ||
        emails.find((e) => e.verified)?.email ||
        ""
    }
  }

  return { email, name: data[cfg.nameField] as string | undefined }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params
  const p = provider as OAuthProvider
  const cfg = OAUTH_PROVIDERS[p]
  if (!cfg) return new Response("Unknown provider", { status: 400 })

  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const savedState = req.cookies.get(`oauth_${provider}_state`)?.value
  const verifier = req.cookies.get(`oauth_${provider}_verifier`)?.value

  if (!code || !state || state !== savedState || !verifier) {
    return new Response("Invalid OAuth state", { status: 400 })
  }

  try {
    const tokens = await exchangeCode(
      p,
      code,
      `${appOrigin(req.url)}/auth/callback/${provider}`,
      verifier,
    )
    const { email, name } = await fetchUserInfo(p, tokens.access_token)

    if (!email) {
      return new Response("Could not retrieve email from provider", {
        status: 400,
      })
    }

    const token = await oauthLogin(p, {
      email,
      name,
      provider_token: tokens.access_token,
    })

    const res = NextResponse.redirect(
      `${appOrigin(req.url)}/auth/done?token=${encodeURIComponent(token.access_token)}`,
    )
    res.cookies.delete(`oauth_${provider}_state`)
    res.cookies.delete(`oauth_${provider}_verifier`)
    return res
  } catch (err) {
    const message = err instanceof Error ? err.message : "OAuth failed"
    return new Response(`OAuth error: ${message}`, { status: 502 })
  }
}
