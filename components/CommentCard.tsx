"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Comment } from "@/types";

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <Card className="w-full bg-white dark:bg-zinc-900 shadow-sm rounded-2xl p-4 mb-3">
      <CardContent className="p-0 flex gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={comment.author.image} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center justify-between text-sm text-muted-foreground gap-3">
            <span className="font-semibold text-foreground">
              {comment.author.name}
            </span>
            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="mt-1 text-base text-foreground">{comment.content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
