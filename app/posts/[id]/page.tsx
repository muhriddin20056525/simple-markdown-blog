"use client";

import CommentCard from "@/components/CommentCard";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Comment, Post } from "@/types";
import axios from "axios";
import { Heart, MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

function PostDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  // State for the post
  const [post, setPost] = useState<Post | null>(null);
  // State for Comment Content
  const [commentContent, setCommentContent] = useState<string>("");
  // State for comments
  const [comments, setComments] = useState<Comment[]>([]);

  // Create a new comment
  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if comment content is empty
    if (!commentContent.trim()) {
      return;
    }

    try {
      const { data } = await axios.post("/api/posts/comments", {
        post: id,
        content: commentContent,
      });

      if (data.success) {
        setCommentContent("");
      }

      fetchComments(id);
    } catch (error) {
      console.log("Failed to create comment:", error);
    }
  };

  // Fetch Comment
  const fetchComments = async (postId: string) => {
    try {
      const { data } = await axios.get(`/api/posts/comments?postId=${postId}`);
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/api/posts/${id}`);
      if (data.success) {
        setPost(data.post);
      }
    };
    fetchPost();

    fetchComments(id);
  }, [id]);

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
        <h2 className="text-lg font-semibold">Comments</h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit}>
          <Textarea
            placeholder="Enter your comment"
            className="h-18 resize-none"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          ></Textarea>

          <Button type="submit" className="mt-2 ml-auto block">
            Post Comment
          </Button>
        </form>

        <div>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard comment={comment} key={comment._id} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No comments yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default PostDetailPage;
