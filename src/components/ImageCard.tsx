import React, { useState } from 'react';
import { Download, Maximize2, ImageIcon } from 'lucide-react';
import { ImageType } from '../types/image';
import { useInView } from 'react-intersection-observer';
import { formatPath } from '../utils/formatters';

interface ImageCardProps {
  image: ImageType;
  onImageClick: (image: ImageType) => void;
}

export function ImageCard({ image, onImageClick }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = image.downloadUrl;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      ref={ref}
      className="relative group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onImageClick(image)}
    >
      {inView && (
        <>
          <div className="aspect-square relative overflow-hidden">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <ImageIcon className="w-8 h-8 text-gray-400 animate-pulse" />
              </div>
            )}
            <img
              src={image.url}
              alt={image.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-lg font-semibold truncate">{image.name}</h3>
              <p className="text-sm opacity-90 truncate">{formatPath(image.folder)}</p>
              <p className="text-sm opacity-90">{image.size}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}