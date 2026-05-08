import { Button } from "@/components/ui/button";
import { uploadService } from "@/features/upload/upload-service";
import { ImagePlus, Loader2, Pencil, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface QuestionImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export const QuestionImageUpload: React.FC<QuestionImageUploadProps> = ({
  value,
  onChange,
  className,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const response = await uploadService.uploadImage(file);
      onChange(response.url);
      console.log(response);
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center transition-colors overflow-hidden ${!value ? "cursor-pointer hover:bg-muted/20" : ""} ${className}`}
      onClick={() => !value && !isUploading && fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {isUploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Uploading...</span>
        </div>
      ) : value ? (
        <div className="relative w-full h-64 group rounded-xl">
          <Image
            src={value}
            alt="Question image"
            fill
            className="object-contain"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Change
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemove}
              className="text-destructive border-destructive hover:text-white hover:bg-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`w-full h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-lg ${!value ? "cursor-pointer hover:bg-muted/50" : ""}`}
        >
          <ImagePlus className="h-12 w-12 mb-2 opacity-50 text-muted-foreground" />
          <span className="font-semibold text-xl text-muted-foreground tracking-wide">
            Add image
          </span>
        </div>
      )}
    </div>
  );
};
