import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../../input";

type TImageUploader = {
  label?: string;
  className?: string;
  setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
  setImagePreview: Dispatch<SetStateAction<[] | string[]>>;
};

const TLImageUploader = ({
  label = "Upload Images",
  className,
  setImageFiles,
  setImagePreview,
}: TImageUploader) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        onChange={handleImageChange}
        type="file"
        multiple
        accept="image/*"
        id="image-uploader"
        className="hidden"
      />
      <label
        htmlFor="image-uploader"
        className="w-full flex items-center justify-center p-2  border border-gray-400 text-gray-900 rounded-md cursor-pointer text-center text-sm hover:bg-gray-50 transition"
      >
        {label}
      </label>
    </div>
  );
};

export default TLImageUploader;
