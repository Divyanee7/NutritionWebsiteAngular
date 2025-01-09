export interface BlogArticle {
    id: number;
    title: string;
    author: string;
    content: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
    imageUrl: string;
    excerpt:string;
    tags: string;
    featured: boolean;
    readTime: number;
  }