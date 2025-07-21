import { authOptions } from "@/lib/auth";
import { connectToMongoose } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Create Post API Route
export async function POST(request: Request) {
  // Connect to MongoDB
  await connectToMongoose();
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
    const post = {
      title,
      content,
      published,
      userId: session.user.id,
    };

    // Return the created post as a response
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
