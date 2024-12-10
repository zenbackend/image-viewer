export interface ImageType {
  name: string;
  url: string;
  downloadUrl: string;
  size?: string;
  path: string;
  folder: string;
}

export interface GithubContent {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url: string | null;
  size?: number;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}