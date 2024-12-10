import React, { useEffect, useState } from 'react';
import { ImageType } from './types/image';
import { fetchImages } from './utils/imageLoader';
import { SearchBar } from './components/SearchBar';
import { ImageGrid } from './components/ImageGrid';
import { ImageModal } from './components/ImageModal';
import { FolderBreadcrumb } from './components/FolderBreadcrumb';
import { ImageIcon } from 'lucide-react';

function App() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentFolder, setCurrentFolder] = useState('');

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const fetchedImages = await fetchImages();
      setImages(fetchedImages);
      setLoading(false);
    };
    loadImages();
  }, []);

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = currentFolder ? image.folder === currentFolder : true;
    return matchesSearch && matchesFolder;
  });

  const handleFolderClick = (folder: string) => {
    setCurrentFolder(folder);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">PNG Gallery</h1>
            </div>
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <FolderBreadcrumb 
            path={currentFolder} 
            onFolderClick={handleFolderClick}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse flex flex-col items-center">
              <ImageIcon className="w-12 h-12 text-blue-500 mb-4" />
              <p className="text-gray-600">Loading images...</p>
            </div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600">
            <ImageIcon className="w-12 h-12 mb-4" />
            <p className="text-xl">No images found</p>
            {(searchTerm || currentFolder) && (
              <p className="mt-2">
                Try adjusting your search term or navigating to a different folder
              </p>
            )}
          </div>
        ) : (
          <ImageGrid images={filteredImages} onImageClick={setSelectedImage} />
        )}
      </main>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

export default App;