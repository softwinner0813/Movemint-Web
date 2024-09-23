import React from 'react';

const FileMessage = ({ message }) => {
  // Function to handle file download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = message.uri;
    link.download = message.name;
    link.click();
  };

  // Convert file size to a human-readable format
  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / 1048576).toFixed(2)} MB`;
  };

  // Calculate stroke dashoffset for the circular progress
  const calculateProgress = (progress) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    return circumference - (progress / 100) * circumference;
  };

  return (
    <div className="flex items-center cursor-pointer max-w-xs my-2">
      {/* If progress is null, display file icon, else show progress bar */}
      {message.metadata.progress == null ? (
        <div className="mr-3" onClick={handleDownload}>
          <svg
            className="h-16 w-16 text-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
            />
          </svg>
        </div>
      ) : (
        <div className="mr-3 relative">
          <svg className="w-16 h-16">
            <circle
              className="text-gray-300"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="20"
              cx="32"
              cy="32"
            />
            <circle
              className="text-blue-500"
              strokeWidth="4"
              strokeDasharray="125.6" // Circumference of the circle
              strokeDashoffset={calculateProgress(message.metadata.progress)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="20"
              cx="32"
              cy="32"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm">{Math.round(message.metadata.progress)}%</span>
          </div>
        </div>
      )}
      
      {/* Display file information */}
      <div className="flex flex-col">
        <div className="font-bold text-sm">{message.name}</div>
        <div className="text-xs text-gray-600">{formatFileSize(message.size)}</div>
      </div>
    </div>
  );
};

export default FileMessage;
