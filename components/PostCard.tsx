"use client"
import Link from "next/link";
import MarkdownRenderer from "./MarkdownRenderer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {

  const { data: session } = useSession()



  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [commentCount, setCommentCount] = useState(0)

  useEffect(() => {
    if (session?.user?.id) {
      setLiked(post.likes.includes(session.user.id));
    }
  }, [session, post.likes]);


  const handleLike = async () => {
    const { data } = await axios.post(`/api/posts/${post._id}/like`);
    console.log(data);


    setLiked(data.liked);
    setLikeCount(data.totalLikes);
  };

  useEffect(() => {
    getCommentsCount()
  }, [])


  const getCommentsCount = async () => {
    try {
      const { data } = await axios.get(`/api/posts/${post._id}/comment-count`)
      setCommentCount(data.count)

    } catch (error) {
      console.log(error);

    }
  }


  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Card Header */}
      <CardHeader>
        {/* Card Avatar */}
        <div className="flex items-center gap-4 mb-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.author.image} alt={post.author.name} />
            <AvatarFallback>
              {post.author.name?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>

          {/* Card Author Info */}
          <div className="text-sm">
            <p className="font-medium text-gray-900">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Card Title */}
        <CardTitle className="text-xl leading-snug hover:underline transition-colors">
          <Link href={`/posts/${post._id}`}>{post.title}</Link>
        </CardTitle>
      </CardHeader>

      {/* Card Markdown Content */}
      <CardContent>
        <div className="max-h-48 overflow-hidden relative text-sm text-muted-foreground">
          <MarkdownRenderer content={post.content} />
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="mt-auto border-t px-6 py-4 flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-red-500 stroke-red-500" : "bg-transparent"}`} />
            <span>{likeCount}</span>
          </Button>


          {/* Comment Button */}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{commentCount}</span>
          </Button>
        </div>

        {/* Post Date */}
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
