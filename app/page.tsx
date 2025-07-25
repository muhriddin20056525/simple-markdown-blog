"use client";

import PostCard from "@/components/PostCard";
import { Post } from "@/types";
import { useEffect, useState } from "react";

function Home() {
  // State for all posts
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="pt-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-4">
        Welcome To Simple Blog
      </h1>
      {/* Description */}
      <p className="text-center text-lg text-muted-foreground font-semibold">
        A clean functional blog focused on great content
      </p>

      <div className="px-10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Map through posts and display them */}
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
