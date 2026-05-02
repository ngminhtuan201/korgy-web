import { api } from "@/lib/http";

export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  MULTIPLE_RESPONSE = "MULTIPLE_RESPONSE",
  TRUE_FALSE = "TRUE_FALSE",
  MATCHING = "MATCHING",
  ORDERING = "ORDERING",
  HOTSPOT = "HOTSPOT",
}

export interface BaseQuestion {
  type: QuestionType;
  title: string;
  /**
   * Time limit in seconds.
   * If not set, it will be unlimited.
   */
  timeLimit?: number;
  points: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MULTIPLE_CHOICE;
}

export interface MultipleResponseQuestion extends BaseQuestion {
  type: QuestionType.MULTIPLE_RESPONSE;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: QuestionType.TRUE_FALSE;
}

export interface MatchingItem {
  text: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: QuestionType.MATCHING;
  pairs: { left: MatchingItem; right: MatchingItem }[];
}

export interface OrderingItem {
  text: string;
  imageUrl?: string;
}

export interface OrderingQuestion extends BaseQuestion {
  type: QuestionType.ORDERING;
  items: OrderingItem[];
}

export interface HotspotQuestion extends BaseQuestion {
  type: QuestionType.HOTSPOT;
  imageUrl: string;
  hotspots: {
    x: number;
    y: number;
  }[];
}

export interface Set {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  thumbnailUrl?: string;
  questions: unknown[];
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export interface CreateSetDto {
  name: string;
  description?: string;
  isPublic: boolean;
  thumbnailUrl?: string;
}

export interface UpdateSetDto {
  name?: string;
  description?: string;
  isPublic?: boolean;
  thumbnailUrl?: string;
}

export const setService = {
  getSets: async () => {
    const response = await api.get<{ sets: Set[] }>("/sets");
    return response.sets;
  },

  getSet: async (id: string) => {
    const response = await api.get<{ set: Set }>(`/sets/${id}`);
    return response.set;
  },

  createSet: async (dto: CreateSetDto) => {
    const response = await api.post<{ newSet: Set }>("/sets", dto);
    return response.newSet;
  },

  updateSet: async (id: string, dto: UpdateSetDto) => {
    const response = await api.put<{ updatedSet: Set }>(`/sets/${id}`, dto);
    return response.updatedSet;
  },

  deleteSet: async (id: string): Promise<void> => {
    await api.delete(`/sets/${id}`);
  },
};
