import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type TImagePreviewerProps = {
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreview: string[];
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
};

const ImagePreviewer = ({
  setImageFiles,
  imagePreview,
  setImagePreview,
  className,
}: TImagePreviewerProps) => {
  const handleRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
    setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className={className}>
      {imagePreview.map((image, index) => (
        <div
          key={index}
          className="relative w-36 h-36 rounded-md overflow-hidden border border-dashed border-gray-300"
        >
          <Image
            src={image}
            alt={`Preview ${index + 1}`}
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
          <Button
            type="button"
            size={"sm"}
            onClick={() => handleRemove(index)}
            className="bg-red-300 hover:bg-red-400 absolute top-0 right-0 w-6 h-6 p-0 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
