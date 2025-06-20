export interface StreamResponse {
  type: 'progress' | 'card' | 'error' | 'done';
  percent?: number;
  question?: string;
  answer?: string;
  message?: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  createdAt: Date;
}

export interface GenerateRequest {
  file: File;
  userInstructions?: string;
}