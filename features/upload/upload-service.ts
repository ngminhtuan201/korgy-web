import { api } from "@/lib/http";

export interface UploadResponse {
  url: string;
  key: string;
  mimetype: string;
  size: number;
}

export const uploadService = {
  uploadImage: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post<UploadResponse>("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
