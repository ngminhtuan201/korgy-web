import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategorizeQuestion } from "@/features/sets/set-service";
import { uploadService } from "@/features/upload/upload-service";
import { ImageIcon, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { QuestionTitleInput } from "../../core/question-title-input";

interface Props {
  question: CategorizeQuestion;
  onChange: (value: CategorizeQuestion) => void;
}

export const CategorizeEditor: React.FC<Props> = ({ question, onChange }) => {
  const categories = question.categories || [];
  const [uploadingPos, setUploadingPos] = useState<{
    catIndex: number;
    itemIndex: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addCategory = () => {
    onChange({
      ...question,
      categories: [...categories, { title: "", items: [{ text: "" }] }],
    });
  };

  const updateCategoryTitle = (catIndex: number, title: string) => {
    const newCategories = [...categories];
    newCategories[catIndex] = { ...newCategories[catIndex], title };
    onChange({ ...question, categories: newCategories });
  };

  const removeCategory = (catIndex: number) => {
    if (categories.length <= 2) return;
    const newCategories = categories.filter((_, i) => i !== catIndex);
    onChange({ ...question, categories: newCategories });
  };

  const addItem = (catIndex: number) => {
    const newCategories = [...categories];
    newCategories[catIndex] = {
      ...newCategories[catIndex],
      items: [...newCategories[catIndex].items, { text: "" }],
    };
    onChange({ ...question, categories: newCategories });
  };

  const updateItemText = (
    catIndex: number,
    itemIndex: number,
    text: string,
  ) => {
    const newCategories = [...categories];
    const newItems = [...newCategories[catIndex].items];
    newItems[itemIndex] = { ...newItems[itemIndex], text };
    newCategories[catIndex] = { ...newCategories[catIndex], items: newItems };
    onChange({ ...question, categories: newCategories });
  };

  const updateItemImage = (
    catIndex: number,
    itemIndex: number,
    imageUrl: string,
  ) => {
    const newCategories = [...categories];
    const newItems = [...newCategories[catIndex].items];
    newItems[itemIndex] = { ...newItems[itemIndex], imageUrl };
    newCategories[catIndex] = { ...newCategories[catIndex], items: newItems };
    onChange({ ...question, categories: newCategories });
  };

  const removeItem = (catIndex: number, itemIndex: number) => {
    if (categories[catIndex].items.length <= 1) return;
    const newCategories = [...categories];
    const newItems = newCategories[catIndex].items.filter(
      (_, i) => i !== itemIndex,
    );
    newCategories[catIndex] = { ...newCategories[catIndex], items: newItems };
    onChange({ ...question, categories: newCategories });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingPos) return;

    try {
      const response = await uploadService.uploadImage(file);
      updateItemImage(
        uploadingPos.catIndex,
        uploadingPos.itemIndex,
        response.url,
      );
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setUploadingPos(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category, catIndex) => (
          <div
            key={catIndex}
            className="bg-card border rounded-xl p-4 space-y-4 shadow-sm relative group"
          >
            <div className="flex items-center gap-2">
              <Input
                value={category.title}
                onChange={(e) => updateCategoryTitle(catIndex, e.target.value)}
                placeholder={`Category ${catIndex + 1} Name`}
                className="font-semibold text-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCategory(catIndex)}
                disabled={categories.length <= 2}
                className="text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex flex-col gap-2 p-2 bg-muted/20 rounded-lg group/item border border-transparent hover:border-border transition-all"
                >
                  <div className="flex items-center gap-2">
                    {item.imageUrl ? (
                      <div className="relative h-12 w-12 rounded-md overflow-hidden flex-none border group/img">
                        <Image
                          src={item.imageUrl}
                          alt={item.text || ""}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <button
                          onClick={() =>
                            updateItemImage(catIndex, itemIndex, "")
                          }
                          className="absolute top-0 right-0 bg-destructive text-white p-0.5 rounded-bl-md opacity-0 group-img-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : null}
                    <Input
                      value={item.text}
                      onChange={(e) =>
                        updateItemText(catIndex, itemIndex, e.target.value)
                      }
                      placeholder="Item text..."
                      className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 h-8"
                    />
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setUploadingPos({ catIndex, itemIndex });
                          fileInputRef.current?.click();
                        }}
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(catIndex, itemIndex)}
                        disabled={category.items.length <= 1}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-item-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addItem(catIndex)}
                className="w-full border-dashed py-4 mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addCategory}
          className="h-auto min-h-[200px] border-dashed border-2 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 rounded-xl transition-all"
        >
          <div className="p-3 rounded-full bg-muted">
            <Plus className="h-6 w-6" />
          </div>
          <span className="font-medium">Add Category</span>
        </Button>
      </div>
    </div>
  );
};

function Category() {}
function CategoryCard() {}
