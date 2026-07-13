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

export type ExposureScore = {
  total_events: number
  critical_count: number
  high_count: number
  medium_count: number
  low_count: number
  info_count: number
  exposure_score: number
  new_events_last_30_days: number
}

export type EventItem = {
  id: string
  tenant_id: string
  identifier_id: string | null
  source: string
  source_type: string
  severity: string
  status: string
  title: string | null
  preview: string | null
  source_url: string | null
  first_seen_at: string
  last_seen_at: string
}

export type EventQuery = {
  identifier_id?: string
  severity?: string
  status?: string
  source?: string
  source_type?: string
  limit?: number
  offset?: number
}

export async function getExposure(token: string): Promise<ExposureScore> {
  const res = await fetch(`${BASE}/api/v1/dashboard/exposure`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw await apiError(res)
  return res.json()
}

export async function getEvents(
  token: string,
  query: EventQuery = {},
): Promise<EventItem[]> {
  const params = new URLSearchParams()
  if (query.identifier_id) params.set("identifier_id", query.identifier_id)
  if (query.severity) params.set("severity", query.severity)
  if (query.status) params.set("status", query.status)
  if (query.source) params.set("source", query.source)
  if (query.source_type) params.set("source_type", query.source_type)
  if (query.limit != null) params.set("limit", String(query.limit))
  if (query.offset != null) params.set("offset", String(query.offset))
  const qs = params.toString()
  const res = await fetch(
    `${BASE}/api/v1/events/${qs ? `?${qs}` : ""}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
  if (!res.ok) throw await apiError(res)
  return res.json()
}

export type OAuthPayload = {
  email: string
  name?: string
  provider_token: string
}

export async function oauthLogin(
  provider: string,
  payload: OAuthPayload,
): Promise<Token> {
  const res = await fetch(`${BASE}/api/v1/auth/oauth/${provider}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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

export type IdentifierType =
  | "domain"
  | "keyword"
  | "email"
  | "ip"
  | "username"

export type Identifier = {
  id: string
  value: string
  name?: string
  type: IdentifierType
  enabled: boolean
  severity_filter?: string
  created_at: string
}

export type CreateIdentifierBody = {
  type: string
  value: string
  enabled: boolean
  severity_filter: string
}

export async function getIdentifiers(token: string): Promise<Identifier[]> {
  const res = await fetch(`${BASE}/api/v1/identifiers/`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw await apiError(res)
  return res.json()
}

export async function createIdentifier(
  token: string,
  body: CreateIdentifierBody,
): Promise<Identifier> {
  const res = await fetch(`${BASE}/api/v1/identifiers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw await apiError(res)
  return res.json()
}

export async function deleteIdentifier(
  token: string,
  id: string,
): Promise<void> {
  const res = await fetch(`${BASE}/api/v1/identifiers/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw await apiError(res)
}
