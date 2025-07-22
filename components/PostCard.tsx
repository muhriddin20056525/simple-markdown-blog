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

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
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
          >
            <Heart className="w-4 h-4" />
            <span>0</span>
          </Button>

          {/* Comment Button */}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>0</span>
          </Button>
        </div>

        {/* Post Date */}
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
