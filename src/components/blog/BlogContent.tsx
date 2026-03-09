'use client';

import { useState } from 'react';
import { Post } from '@/types/post';
import CategoryFilter from './CategoryFilter';
import FeaturedPost from './FeaturedPost';
import PostGrid from './PostGrid';
import Pagination from './Pagination';
import Divider from '@/components/shared/Divider';

export default function BlogContent({
  posts,
  featuredPost,
  categories,
}: {
  posts: Post[];
  featuredPost: Post | undefined;
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts =
    activeCategory === 'All'
      ? posts.filter((p) => !p.featured)
      : posts.filter((p) => p.category === activeCategory && !p.featured);

  const recentPosts = filteredPosts.slice(0, 3);
  const morePosts = filteredPosts.slice(3);

  return (
    <>
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />
      <Divider />
      {featuredPost && (activeCategory === 'All' || featuredPost.category === activeCategory) && (
        <>
          <FeaturedPost post={featuredPost} />
          <Divider />
        </>
      )}
      {recentPosts.length > 0 && (
        <>
          <PostGrid posts={recentPosts} title="Recent Posts" />
          <Divider />
        </>
      )}
      {morePosts.length > 0 && (
        <>
          <PostGrid posts={morePosts} title="More Posts" />
          <Divider />
        </>
      )}
      <Pagination />
    </>
  );
}
