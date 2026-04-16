export function getRemoteUrl(repo, token) {
  if (token) {
    return `https://x-access-token:${token}@github.com/${repo}.git`;
  }

  return `https://github.com/${repo}.git`;
}
