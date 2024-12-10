import React from 'react';
import Masonry from 'react-masonry-css';
import { ImageCard } from './ImageCard';
import { ImageType } from '../types/image';

interface ImageGridProps {
  images: ImageType[];
  onImageClick: (image: ImageType) => void;
}

export function ImageGrid({ images, onImageClick }: ImageGridProps) {
  const breakpointColumns = {
    default: 4,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-4 w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {images.map((image) => (
        <div key={image.url} className="mb-4">
          <ImageCard image={image} onImageClick={onImageClick} />
        </div>
      ))}
    </Masonry>
  );
}