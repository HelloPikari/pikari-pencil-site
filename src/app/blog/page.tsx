import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Divider from '@/components/shared/Divider';
import NewsletterCTA from '@/components/shared/NewsletterCTA';
import BlogHero from '@/components/blog/BlogHero';
import BlogContent from '@/components/blog/BlogContent';
import { getAllPosts, getFeaturedPost, getAllCategories } from '@/lib/posts';

export const metadata = {
  title: 'Blog',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const categories = getAllCategories();

  return (
    <>
      <Header />
      <Divider />
      <BlogHero />
      <BlogContent posts={posts} featuredPost={featuredPost} categories={categories} />
      <Divider />
      <NewsletterCTA title="Never Miss a Discovery" />
      <Footer />
    </>
  );
}
