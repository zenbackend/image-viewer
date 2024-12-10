import { ImageType, GithubContent } from '../types/image';
import { fetchGithubContents } from './github';
import { formatBytes, formatPath } from './formatters';

export async function fetchImages(path: string = ''): Promise<ImageType[]> {
  try {
    const contents = await fetchGithubContents(path);
    const images: ImageType[] = [];

    for (const item of contents) {
      if (item.type === 'dir') {
        // Recursively fetch images from subdirectories
        const subImages = await fetchImages(item.path);
        images.push(...subImages);
      } else if (item.type === 'file' && item.name.toLowerCase().endsWith('.png')) {
        images.push({
          name: item.name,
          url: item.download_url!,
          downloadUrl: item.download_url!,
          size: item.size ? formatBytes(item.size) : undefined,
          path: item.path,
          folder: item.path.split('/').slice(0, -1).join('/')
        });
      }
    }

    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}