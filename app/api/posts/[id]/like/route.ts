import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDb } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1. Connect to DB
  await connectToDb();

  // 2. Get post ID
  const postId = params.id;

  // 3. Get user ID from session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const userId = session.user.id;

  // 4. Validate ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(postId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    // 5. Get post from DB
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post Not Found" }, { status: 404 });
    }

    // 6. Check if user already liked
    const alreadyLiked = post.likes.some(
      (id: any) => id.toString() === userId.toString()
    );

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(
        (id: any) => id.toString() !== userId.toString()
      );
    } else {
      // Like
      post.likes.push(userId);
    }

    // 7. Save updated post
    await post.save();

    // 8. Return updated like status
    return NextResponse.json({
      liked: !alreadyLiked,
      totalLikes: post.likes.length,
    });
  } catch (err) {
    console.error("Like error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
