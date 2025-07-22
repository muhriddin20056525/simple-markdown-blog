import { connectToDb } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Connect to MongoDB
  await connectToDb();

  try {
    // Fetch the post by ID from the database
    const post = await Post.findById(params.id).populate(
      "author",
      "name email image"
    );

    // Check if the post exists
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    // Return the post as a response
    return NextResponse.json({ success: true, post }, { status: 200 });
  } catch (error) {
    return new Response(`Error fetching post: ${error}`, {
      status: 500,
    });
  }
}
