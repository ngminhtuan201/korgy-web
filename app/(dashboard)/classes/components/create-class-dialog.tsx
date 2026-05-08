"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  X,
  Loader2,
  Check,
  AlertCircle,
  Globe,
  Lock,
  ImageIcon,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CreateClassDialogProps {
  /** Optional trigger button. If not provided, a default "Create Class" button is used. */
  trigger?: React.ReactNode;
  /** Called after successful class creation */
  onSuccess?: () => void;
  /** Variant of the default trigger button */
  variant?: "default" | "secondary" | "outline" | "ghost";
  /** Size of the default trigger button */
  size?: "default" | "sm" | "lg";
}

interface FormErrors {
  name?: string;
  subject?: string;
  code?: string;
  description?: string;
}

// Subject options
const subjectOptions = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Literature",
  "History",
  "Geography",
  "English",
  "Computer Science",
  "Art",
  "Music",
  "Physical Education",
  "Other",
];

export function CreateClassDialog({
  trigger,
  onSuccess,
  variant = "default",
  size = "default",
}: CreateClassDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Form state matching Class model
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subject: "",
    code: "",
    isPublic: false,
    thumbnailUrl: "",
  });

  // Preview thumbnail
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  // Auto-generate class code from name
  const generateCode = (name: string) => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return words
        .map((w) => w.charAt(0).toUpperCase())
        .join("")
        .slice(0, 6);
    }
    return name.slice(0, 6).toUpperCase();
  };

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
      code: value ? generateCode(value) : prev.code,
    }));
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Class name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Class name must be at least 3 characters";
    } else if (formData.name.length > 100) {
      newErrors.name = "Class name must be less than 100 characters";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Class code is required";
    } else if (formData.code.length < 3) {
      newErrors.code = "Class code must be at least 3 characters";
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateForm()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful creation
      const newClass = {
        id: `class_${Date.now()}`,
        userId: "user_001",
        ...formData,
        memberIds: [],
        setIds: [],
        thumbnailUrl: thumbnailPreview || formData.thumbnailUrl || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log("Created class:", newClass);

      // Reset form and close dialog
      setFormData({
        name: "",
        description: "",
        subject: "",
        code: "",
        isPublic: false,
        thumbnailUrl: "",
      });
      setThumbnailPreview(null);
      setErrors({});
      setStep(1);
      setOpen(false);

      // Call success callback
      onSuccess?.();

      // Navigate to the new class detail page
      router.push(`/classes/${newClass.id}`);
    } catch (error) {
      console.error("Failed to create class:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to server and get URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          thumbnailUrl: URL.createObjectURL(file),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetDialog = () => {
    setFormData({
      name: "",
      description: "",
      subject: "",
      code: "",
      isPublic: false,
      thumbnailUrl: "",
    });
    setThumbnailPreview(null);
    setErrors({});
    setStep(1);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Delay reset to avoid visual flicker
      setTimeout(resetDialog, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={variant} size={size}>
            <Plus className="mr-2 h-4 w-4" />
            Create Class
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {step === 1 ? "Create New Class" : "Review & Confirm"}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Fill in the details below to create a new class."
              : "Review the class information before creating."}
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step > 1 ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <div
            className={`h-0.5 flex-1 ${
              step > 1 ? "bg-primary" : "bg-muted"
            }`}
          />
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step > 2 ? <Check className="h-4 w-4" /> : "2"}
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-5">
            {/* Class Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Class Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Advanced Mathematics 10A1"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Class code will be auto-generated from the name
              </p>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, subject: value }));
                  if (errors.subject) {
                    setErrors((prev) => ({ ...prev, subject: undefined }));
                  }
                }}
              >
                <SelectTrigger
                  id="subject"
                  className={errors.subject ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjectOptions.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subject && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Class Code */}
            <div className="space-y-2">
              <Label htmlFor="code">
                Class Code <span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="code"
                  placeholder="Auto-generated from name"
                  value={formData.code}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      code: e.target.value.toUpperCase(),
                    }));
                    if (errors.code) {
                      setErrors((prev) => ({ ...prev, code: undefined }));
                    }
                  }}
                  className={`font-mono uppercase ${
                    errors.code ? "border-destructive" : ""
                  }`}
                  maxLength={10}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      code: generateCode(prev.name),
                    }))
                  }
                  title="Regenerate code"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-rotate-ccw"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </Button>
              </div>
              {errors.code && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.code}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Unique code used by students to join this class (max 10 characters)
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the class (optional)"
                value={formData.description}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                  if (errors.description) {
                    setErrors((prev) => ({
                      ...prev,
                      description: undefined,
                    }));
                  }
                }}
                className={errors.description ? "border-destructive" : ""}
                rows={3}
                maxLength={500}
              />
              <div className="flex justify-between">
                {errors.description ? (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.description}
                  </p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-muted-foreground">
                  {formData.description.length}/500
                </span>
              </div>
            </div>

            {/* Visibility */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="isPublic" className="text-base">
                  Public Class
                </Label>
                <p className="text-sm text-muted-foreground">
                  Anyone with the class code can join
                </p>
              </div>
              <div className="flex items-center gap-2">
                {formData.isPublic ? (
                  <Badge variant="default">
                    <Globe className="h-3 w-3 mr-1" />
                    Public
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <Lock className="h-3 w-3 mr-1" />
                    Private
                  </Badge>
                )}
                <Switch
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isPublic: checked }))
                  }
                />
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label>Class Thumbnail</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden">
                  {thumbnailPreview || formData.thumbnailUrl ? (
                    <img
                      src={thumbnailPreview || formData.thumbnailUrl}
                      alt="Thumbnail preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </Label>
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailUpload}
                  />
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or WEBP. Max 2MB.
                  </p>
                  {thumbnailPreview && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive h-auto p-0 text-xs"
                      onClick={() => {
                        setThumbnailPreview(null);
                        setFormData((prev) => ({
                          ...prev,
                          thumbnailUrl: "",
                        }));
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Review & Confirm */}
        {step === 2 && (
          <div className="space-y-5">
            {/* Summary Card */}
            <div className="rounded-lg border p-4 space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                {formData.isPublic ? (
                  <Globe className="h-5 w-5 text-primary" />
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
                {formData.name || "Unnamed Class"}
              </h3>

              <Separator />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Subject:</span>
                  <p className="font-medium">{formData.subject || "Not set"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Code:</span>
                  <p className="font-mono font-medium">
                    {formData.code || "Auto-generated"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Visibility:</span>
                  <p className="font-medium">
                    {formData.isPublic ? "Public" : "Private"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Thumbnail:</span>
                  <p className="font-medium">
                    {thumbnailPreview || formData.thumbnailUrl
                      ? "Uploaded"
                      : "None"}
                  </p>
                </div>
              </div>

              {formData.description && (
                <>
                  <Separator />
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Description:
                    </span>
                    <p className="text-sm mt-1 text-muted-foreground/80 line-clamp-3">
                      {formData.description}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Preview Card (mimics the card in the list page) */}
            <div>
              <p className="text-sm font-medium mb-2">Preview:</p>
              <div className="rounded-lg border overflow-hidden">
                {thumbnailPreview || formData.thumbnailUrl ? (
                  <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-600">
                    <img
                      src={thumbnailPreview || formData.thumbnailUrl}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{formData.name}</p>
                    <Badge
                      variant={formData.isPublic ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {formData.isPublic ? "Public" : "Private"}
                    </Badge>
                  </div>
                  {formData.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {formData.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {formData.code}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      0 members • 0 study sets
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Alert Info */}
            <Alert variant="default" className="bg-muted/50">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Almost there!</AlertTitle>
              <AlertDescription>
                After creating this class, you'll be redirected to the class
                detail page where you can add members and study sets.
              </AlertDescription>
            </Alert>
          </div>
        )}

        <DialogFooter className="mt-6">
          {step === 1 ? (
            <div className="flex w-full justify-between">
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleNext}>
                Next: Review
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </div>
          ) : (
            <div className="flex w-full justify-between">
              <Button variant="outline" onClick={handleBack}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Create Class
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
