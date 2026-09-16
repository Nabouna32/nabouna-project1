export type Tool = {
  id: string;
  slug: string;
  categoryId: string;
  icon: string;
  name: string;
  description: string;
  keywords?: string[];
  available?: boolean;
};
