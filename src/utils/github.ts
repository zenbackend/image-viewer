import { GithubContent } from '../types/image';

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'Durga-chikkala';
const REPO_NAME = 'PNG-images';

export async function fetchGithubContents(path: string = ''): Promise<GithubContent[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`
    );
    if (!response.ok) throw new Error('Failed to fetch repository contents');
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub contents:', error);
    return [];
  }
}