export interface PostAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface PostFrontmatter {
  title: string;
  category: 'Research' | 'Frameworks' | 'Case Studies' | 'Field Notes';
  date: string;
  excerpt: string;
  image: string;
  featured: boolean;
  readTime: string;
  author: PostAuthor;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}
