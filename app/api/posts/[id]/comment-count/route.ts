import { connectToDb } from "@/lib/mongoose";
import Comment from "@/models/Comment";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDb();

  const count = await Comment.countDocuments({ post: params.id });

  return NextResponse.json({ count });
}
