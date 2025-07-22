"use client";

import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

function PostDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  // State for the post
  const [post, setPost] = useState<Post | null>(null);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/api/posts/${id}`);
      if (data.success) {
        setPost(data.post);
      }
    };
    fetchPost();
  }, [params.id]);

  // If post is not loaded yet, show loading state
  if (!post) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarImage src={post.author.image} alt={post.author.name} />
            <AvatarFallback>
              {post.author.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-sm">
            <p className="font-medium">{post.author.name}</p>
            <p className="text-muted-foreground text-xs">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
        <MarkdownRenderer content={post.content} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 border-t pt-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 hover:text-red-500"
        >
          <Heart className="w-4 h-4" />
          <span>Like</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 hover:text-blue-500"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Comment</span>
        </Button>
      </div>

      {/* Comments Section */}
      <Card className="mt-10 p-4">
        <h2 className="text-lg font-semibold mb-3">Comments</h2>
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      </Card>
    </div>
  );
}

export default PostDetailPage;
