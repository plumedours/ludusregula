export function withBase(p) {
  const base = import.meta.env.BASE_URL || "/";
  const clean = String(p || "").replace(/^\//, "");
  const prefix = base.endsWith("/") ? base : base + "/";
  return prefix + clean;
}
