export function getAvatarFallback(name: string, username: string): string {
  const displayName = name || username || "?";
  const initials = displayName
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&color=fff&size=150&bold=true`;
}
