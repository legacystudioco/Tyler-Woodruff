import { createHash, createHmac, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";

const scryptAsync = promisify(scrypt) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

export const SESSION_COOKIE = "tw_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const sessionSecret = () => process.env.ADMIN_SESSION_SECRET ?? "";
const passwordHash = () => process.env.ADMIN_PASSWORD_HASH ?? "";

export function adminBasePath() {
  const slug = process.env.ADMIN_PATH;
  return slug ? `/${slug}` : null;
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PATH && process.env.ADMIN_EMAIL && passwordHash() && sessionSecret());
}

function safeEqual(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b);
}

// ADMIN_PASSWORD_HASH format: scrypt:<salt hex>:<hash hex>
export async function verifyCredentials(email: string, password: string) {
  if (!isAdminConfigured()) return false;
  const [scheme, saltHex, hashHex] = passwordHash().split(":");
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false;

  const expected = Buffer.from(hashHex, "hex");
  const actual = await scryptAsync(password, Buffer.from(saltHex, "hex"), expected.length);
  const emailMatches = safeEqual(
    Buffer.from(email.trim().toLowerCase()),
    Buffer.from(process.env.ADMIN_EMAIL!.trim().toLowerCase()),
  );
  return safeEqual(actual, expected) && emailMatches;
}

// Signing over the password hash means changing the password signs every session out.
function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(`${payload}.${passwordHash()}`).digest("base64url");
}

export function createSessionToken() {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${expires}.${sign(expires)}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token || !isAdminConfigured()) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(Buffer.from(signature), Buffer.from(sign(expires)));
}

export async function isAdminSession() {
  return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
}

export function attemptKey(ip: string) {
  return createHash("sha256").update(`${ip}.${sessionSecret()}`).digest("hex").slice(0, 32);
}
