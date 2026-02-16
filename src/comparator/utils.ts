export function mapEnglishRoleToItalian(role: string): string {
  const roleMap: Record<string, string> = {
    GK: "P",
    GOALKEEPER: "P",
    D: "D",
    DEF: "D",
    DEFENDER: "D",
    M: "C",
    MID: "C",
    MIDFIELDER: "C",
    F: "A",
    FW: "A",
    FWD: "A",
    FORWARD: "A",
    ATT: "A",
    ATTACKER: "A",
    S: "A",
    ST: "A",
    STRIKER: "A",
  };

  const normalizedRole = role?.trim().toUpperCase();
  const directMappedRole = roleMap[normalizedRole];

  if (directMappedRole) {
    return directMappedRole;
  }

  const roleTokens = normalizedRole.split(/[\s/,-]+/).filter(Boolean);
  const mappedTokens = roleTokens.map(token => roleMap[token] || token);
  const uniqueMappedTokens = mappedTokens.filter(
    (mappedToken, index) => mappedTokens.indexOf(mappedToken) === index
  );

  if (uniqueMappedTokens.length > 0) {
    return uniqueMappedTokens.join("/");
  }

  return role;
}
