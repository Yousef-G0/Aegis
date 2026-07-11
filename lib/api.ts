const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000"

export type Token = { access_token: string; token_type: string }
export type UserOut = {
  id: string
  tenant_id: string
  email: string
  role: string
  created_at: string
}
export type TenantOut = {
  id: string
  name: string
  slug: string
  plan: string
  created_at: string
}

async function apiError(res: Response): Promise<Error> {
  let detail = ""
  try {
    const data = await res.json()
    detail = JSON.stringify(data.detail ?? data)
  } catch {
    detail = res.statusText
  }
  return new Error(detail || `Request failed (${res.status})`)
}

export async function registerTenant(
  name: string,
  slug: string,
): Promise<TenantOut> {
  const res = await fetch(`${BASE}/api/v1/auth/register-tenant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, slug, plan: "free" }),
  })
  if (!res.ok) throw await apiError(res)
  return res.json()
}

export async function registerUser(
  tenantSlug: string,
  email: string,
  password: string,
): Promise<UserOut> {
  const res = await fetch(
    `${BASE}/api/v1/auth/register?tenant_slug=${encodeURIComponent(tenantSlug)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: "member" }),
    },
  )
  if (!res.ok) throw await apiError(res)
  return res.json()
}

export async function login(email: string, password: string): Promise<Token> {
  const body = new URLSearchParams()
  body.set("grant_type", "password")
  body.set("username", email)
  body.set("password", password)
  const res = await fetch(`${BASE}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })
  if (!res.ok) throw await apiError(res)
  return res.json()
}

export async function getMe(token: string): Promise<UserOut> {
  const res = await fetch(`${BASE}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw await apiError(res)
  return res.json()
}

export function setToken(token: string) {
  if (typeof window !== "undefined") localStorage.setItem("aegis_token", token)
}

export function getToken(): string | null {
  if (typeof window !== "undefined")
    return localStorage.getItem("aegis_token")
  return null
}

export function clearToken() {
  if (typeof window !== "undefined") localStorage.removeItem("aegis_token")
}
