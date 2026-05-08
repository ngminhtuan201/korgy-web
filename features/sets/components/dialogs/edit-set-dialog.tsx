"use client";

import { ImagePlus, Loader2, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { uploadService } from "@/features/upload/upload-service";
import { cn } from "@/lib/utils";
import { Set, setService, UpdateSetDto } from "../../set-service";

interface EditSetDialogProps {
  children?: React.ReactNode;
  onSave?: (data: UpdateSetDto) => void;
  set: Set;
}

export function EditSetDialog({ children, onSave, set }: EditSetDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<UpdateSetDto>({
    name: set.name,
    description: set.description,
    isPublic: set.isPublic,
    thumbnailUrl: set.thumbnailUrl,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    set.thumbnailUrl || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || formData.name.trim() === "") return;

    setIsLoading(true);
    try {
      const newSet = await setService.updateSet(set.id, formData);
      if (onSave) onSave(formData);
      setOpen(false);
      resetForm();
      router.refresh();
    } catch (error) {
      console.error("Failed to update set:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: set.name,
      description: set.description,
      isPublic: set.isPublic,
      thumbnailUrl: set.thumbnailUrl,
    });
    setThumbnailPreview(set.thumbnailUrl || null);
  };

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const response = await uploadService.uploadImage(file);
        setThumbnailPreview(response.url);
        setFormData((prev) => ({ ...prev, thumbnailUrl: response.url }));
      } catch (error) {
        console.error("Failed to upload thumbnail:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeThumbnail = (e: React.MouseEvent) => {
    e.stopPropagation();
    setThumbnailPreview(null);
    setFormData((prev) => ({ ...prev, thumbnailUrl: "" }));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Playset</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleThumbnailChange}
          />

          {/* Thumbnail */}
          <div className="space-y-2">
            <div
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={cn(
                "flex h-48 w-full items-center justify-center rounded-xl border-2 border-dashed transition-all cursor-pointer group overflow-hidden relative bg-muted/20 hover:bg-muted/30",
                thumbnailPreview ? "border-solid border-transparent" : "",
              )}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Uploading...
                  </span>
                </div>
              ) : thumbnailPreview ? (
                <>
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="bg-white hover:bg-white/90 text-black border-none"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Change
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeThumbnail}
                      className="bg-destructive hover:bg-destructive/90 text-white border-none"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center font-sans">
                  <div className="p-3 rounded-full bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                    <ImagePlus className="size-6" />
                  </div>
                  <span className="font-medium">Add playset thumbnail</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Recommended: 16:9 aspect ratio
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="Enter playset name (required)"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description (optional)"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
            />
          </div>

          {/* Is Public */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="isPublic">Make this playset public</Label>
                <Switch
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isPublic: checked }))
                  }
                />
              </div>
              <p className="text-muted-forground text-xs">
                Allow others to discover and use this playset
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => onSave(formData)}
              type="submit"
              disabled={isLoading || !formData.name.trim()}
            >
              {isLoading ? "Updating..." : "Update Playset"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
