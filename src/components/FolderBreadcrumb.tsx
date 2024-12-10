import React from 'react';
import { ChevronRight, FolderIcon } from 'lucide-react';

interface FolderBreadcrumbProps {
  path: string;
  onFolderClick: (folder: string) => void;
}

export function FolderBreadcrumb({ path, onFolderClick }: FolderBreadcrumbProps) {
  const parts = path.split('/').filter(Boolean);
  
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <button
        onClick={() => onFolderClick('')}
        className="flex items-center hover:text-blue-500 transition-colors"
      >
        <FolderIcon className="w-4 h-4 mr-1" />
        <span>Root</span>
      </button>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4" />
          <button
            onClick={() => onFolderClick(parts.slice(0, index + 1).join('/'))}
            className="hover:text-blue-500 transition-colors"
          >
            {part}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}