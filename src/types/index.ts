
export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
  image?: string;
  type: string;
}
