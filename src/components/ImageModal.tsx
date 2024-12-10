import React from 'react';
import { X, Download } from 'lucide-react';
import { ImageType } from '../types/image';

interface ImageModalProps {
  image: ImageType | null;
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  if (!image) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.downloadUrl;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative max-w-7xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={handleDownload}
            className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
          >
            <Download className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="p-4">
          <img
            src={image.url}
            alt={image.name}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </div>
        <div className="p-4 border-t">
          <h2 className="text-xl font-semibold">{image.name}</h2>
          <p className="text-gray-600">{image.size}</p>
        </div>
      </div>
    </div>
  );
}