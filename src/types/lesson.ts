export interface Lesson {
  id: string;
  contentCategoryId: string;
  title: string;
  body: string;
  orderIndex: number;
  completed?: boolean;
}
