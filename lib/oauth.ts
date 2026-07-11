export type OAuthProvider = "google" | "github"

type ProviderConfig = {
  authUrl: string
  tokenUrl: string
  userInfoUrl: string
  scope: string
  clientIdEnv: string
  clientSecretEnv: string
  // GitHub returns form-encoded; Google returns JSON
  tokenResponseJson: boolean
  // how to read the email/name from the userinfo response
  emailField: string
  nameField: string
}

export const OAUTH_PROVIDERS: Record<OAuthProvider, ProviderConfig> = {
  google: {
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userInfoUrl: "https://openidconnect.googleapis.com/v1/userinfo",
    scope: "openid email profile",
    clientIdEnv: "GOOGLE_CLIENT_ID",
    clientSecretEnv: "GOOGLE_CLIENT_SECRET",
    tokenResponseJson: true,
    emailField: "email",
    nameField: "name",
  },
  github: {
    authUrl: "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    userInfoUrl: "https://api.github.com/user",
    scope: "read:user user:email",
    clientIdEnv: "GITHUB_CLIENT_ID",
    clientSecretEnv: "GITHUB_CLIENT_SECRET",
    tokenResponseJson: false,
    emailField: "email",
    nameField: "name",
  },
}

function base64url(input: ArrayBuffer | Uint8Array): string {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input)
  return Buffer.from(bytes).toString("base64url")
}

export function randomState(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return base64url(bytes)
}

export function generateVerifier(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32))
  return base64url(bytes)
}

export async function pkceChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return base64url(digest)
}

export function appOrigin(reqUrl: string): string {
  return new URL(reqUrl).origin
}
