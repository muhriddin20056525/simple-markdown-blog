import { authOptions } from "@/lib/auth";
import { connectToDb } from "@/lib/mongoose";
import { Post } from "@/models/Post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Create Post API Route
export async function POST(request: Request) {
  // Connect to MongoDB
  await connectToDb();
  // Get the post data from the request body
  const { title, content, published } = await request.json();

  // Validate the post data
  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  // Get User ID from next-auth session
  const session = await getServerSession(authOptions);
  // Check if the user is authenticated
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Create a new post object
    const post = await Post.create({
      title,
      content,
      published,
      author: session.user.id,
      like: [],
    });

    // Return the created post as a response
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create post ${error}` },
      { status: 500 }
    );
  }
}

// Get Posts API Route
export async function GET() {
  // Connect to MongoDB
  await connectToDb();

  try {
    // Fetch all posts from the database
    const posts = await Post.find({ published: true }).populate(
      "author",
      "name email, image"
    );

    // Return the posts as a response
    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch posts ${error}` },
      { status: 500 }
    );
  }
}
