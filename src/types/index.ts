
export interface Question {
  id: number;
  text: string;
  image?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
