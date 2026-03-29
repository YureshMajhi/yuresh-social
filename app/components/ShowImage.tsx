import React from "react";

const ShowImage = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string;
  setSelectedImage: (image: string | null) => void;
}) => {
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200"
        onClick={() => setSelectedImage(null)}
      >
        <div className="relative max-w-4xl max-h-full">
          <button
            className="absolute -top-10 right-0 text-white text-xl font-bold hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            Close
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default ShowImage;
