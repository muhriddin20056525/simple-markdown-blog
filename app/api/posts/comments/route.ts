// Create Comment API Route

import { authOptions } from "@/lib/auth";
import { connectToDb } from "@/lib/mongoose";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Connect to the database
  await connectToDb();

  // Parse the request json
  const { content, post } = await request.json();

  // Validate the required fields
  if (!content || !post) {
    return new Response("Missing required fields", { status: 400 });
  }

  // Get author id from session
  const session = await getServerSession(authOptions);

  // Check if session and user exist
  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Create a new comment object
    const newComment = await Comment.create({
      content,
      post,
      author: session.user.id,
    });

    // Return the created comment
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create comment ${error}` },
      { status: 500 }
    );
  }
}

// Get Comments API Route
export async function GET(request: Request) {
  // connect to the database
  await connectToDb();

  // Get post id from query parameters
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "post id not defined" }, { status: 400 });
  }

  try {
    // Fetch comments for the post
    const comments = await Comment.find({ post: postId })
      .populate("author", "name image")
      .sort({ createdAt: -1 });

    // Return the comments
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch comment ${error}` },
      { status: 500 }
    );
  }
}
