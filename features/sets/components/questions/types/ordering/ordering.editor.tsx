import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderingQuestion } from "@/features/sets/set-service";
import { uploadService } from "@/features/upload/upload-service";
import { GripVertical, ImageIcon, Plus, Trash2, X } from "lucide-react";
import { Reorder } from "motion/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { QuestionTitleInput } from "../../core/question-title-input";

const MAX_ITEMS = 6;

interface Props {
  question: OrderingQuestion;
  onChange: (value: OrderingQuestion) => void;
}

export const OrderingEditor: React.FC<Props> = ({ question, onChange }) => {
  const items = question.items || [];
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateItemText = (index: number, text: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], text };
    onChange({ ...question, items: newItems });
  };

  const updateItemImage = (index: number, imageUrl: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], imageUrl };
    onChange({ ...question, items: newItems });
  };

  const addItem = () => {
    onChange({
      ...question,
      items: [...items, { text: "" }],
    });
  };

  const removeItem = (index: number) => {
    if (items.length <= 2) return;
    const newItems = items.filter((_, i) => i !== index);
    onChange({ ...question, items: newItems });
  };

  const handleReorder = (newItems: any[]) => {
    onChange({ ...question, items: newItems });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || uploadingIndex === null) return;

    try {
      const response = await uploadService.uploadImage(file);
      updateItemImage(uploadingIndex, response.url);
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setUploadingIndex(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      <QuestionTitleInput
        value={question.title || ""}
        onChange={(value) => onChange({ ...question, title: value })}
      />

      {/* Description / Instructions */}
      <p className="text-sm text-muted-foreground text-center italic">
        Arrange items in the correct order. The order shown here is the correct
        one.
      </p>

      {/* Items List */}
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="space-y-2"
      >
        {items.map((item, index) => (
          <Reorder.Item
            key={item.text + index}
            value={item}
            className="flex items-center gap-3 p-3 bg-card border rounded-lg shadow-sm"
          >
            <div className="cursor-grab active:cursor-grabbing text-muted-foreground">
              <GripVertical className="h-5 w-5" />
            </div>
            <div className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
              {index + 1}
            </div>

            {item.imageUrl ? (
              <div className="relative h-16 w-16 rounded-md overflow-hidden flex-none border group">
                <Image
                  src={item.imageUrl}
                  alt={item.text}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-300"
                  unoptimized
                />
                <Button
                  variant={"destructive"}
                  size={"icon"}
                  onClick={() => updateItemImage(index, "")}
                  className="absolute -top-1.5 -right-1 rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : null}

            <Input
              value={item.text}
              onChange={(e) => updateItemText(index, e.target.value)}
              placeholder={"Enter item text here"}
              className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 font-medium"
            />

            <Button
              size="sm"
              variant={"outline"}
              onClick={() => {
                setUploadingIndex(index);
                fileInputRef.current?.click();
              }}
              // disabled={uploadingIndex === index}
            >
              {/* {uploadingIndex === index ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <ImageIcon className="h-4 w-4 mr-1" />
              )} */}
              <ImageIcon className="h-4 w-4 mr-1" />

              {item.imageUrl ? "Change" : "Image"}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              disabled={items.length <= 2}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <Button
        onClick={addItem}
        variant="outline"
        className="w-full border-dashed py-6"
        disabled={items.length >= MAX_ITEMS}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
};

function Item() {}
