export type User = 'Eder' | 'Sofía';
export type View = 'Home' | 'Eder' | 'Sofía';

export interface Goal {
  id: string;
  text: string;
  category: string;
  completedBy: User[]; // List of users who completed this goal
  evidence: {
    [key in User]?: string; // URL of the image evidence per user
  };
}

export interface UserStats {
  streak: number;
  journal: string;
}

export interface VisionPillar {
  title: string;
  image: string;
  description: string;
}