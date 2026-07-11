import { NextResponse } from "next/server"
import {
  OAUTH_PROVIDERS,
  type OAuthProvider,
  generateVerifier,
  randomState,
  pkceChallenge,
  appOrigin,
} from "@/lib/oauth"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params
  const cfg = OAUTH_PROVIDERS[provider as OAuthProvider]
  if (!cfg) return new Response("Unknown provider", { status: 400 })

  const clientId = process.env[cfg.clientIdEnv]
  if (!clientId) {
    return new Response("OAuth is not configured for this provider", {
      status: 500,
    })
  }

  const verifier = generateVerifier()
  const challenge = await pkceChallenge(verifier)
  const state = randomState()
  const redirectUri = `${appOrigin(req.url)}/auth/callback/${provider}`

  const url =
    `${cfg.authUrl}?response_type=code` +
    `&client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(cfg.scope)}` +
    `&state=${state}` +
    `&code_challenge=${encodeURIComponent(challenge)}` +
    `&code_challenge_method=S256`

  const res = NextResponse.redirect(url)
  res.cookies.set(`oauth_${provider}_verifier`, verifier, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  })
  res.cookies.set(`oauth_${provider}_state`, state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  })
  return res
}
