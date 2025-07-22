"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Eye } from "lucide-react";
import { FormEvent, useState } from "react";
import axios from "axios";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useRouter } from "next/navigation";

function CreatePostPage() {
  // State variables for post details
  // title, content, and published status
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  // State variable for preview mode
  const [preview, setPreview] = useState(false);

  // router for navigation after post creation
  const router = useRouter();

  const handleCreatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if title and content are provided
    if (!title || !content) {
      return;
    }

    // Send request to create a new post
    const { data } = await axios.post("/api/posts", {
      title,
      content,
      published,
    });

    console.log(data);

    if (data.success) {
      // Reset form fields after successful post creation
      setTitle("");
      setContent("");
      setPublished(false);
      setPreview(false);
      // Navigate to the newly created post or a success page
      router.push("/");
    }
  };

  return (
    <div className="py-5 max-w-5xl  mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center">Create New Post</h2>

        {/* Preview Button */}
        <Button onClick={() => setPreview(!preview)}>
          <Eye />
          Preview
        </Button>
      </div>

      <div
        className={`grid grid-cols-1 ${
          preview ? "md:grid-cols-2" : "md:grid-cols-1"
        } gap-5`}
      >
        {/* Card for Post Content */}
        <Card>
          {/* Card Header */}
          <CardHeader>
            <CardTitle>Write Post</CardTitle>
          </CardHeader>
          {/* Card Content */}
          <CardContent>
            <form onSubmit={handleCreatePost}>
              {/* Input Field For Title */}
              <div className="mb-3">
                <Label htmlFor="title" className="mb-2 text-lg">
                  Title
                </Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter Post Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Textarea Field For Content */}
              <div className="mb-3">
                <Label htmlFor="content" className="mb-2 text-lg">
                  Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Enter Post Content"
                  className="min-h-80"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Switch for Published Status */}
              <div className="flex items-center space-x-2 my-4">
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
              {/* Create Post Button */}
              <Button className="w-full">Create Post</Button>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {preview && (
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-x-4">
                <h2 className="text-2xl font-bold">{title || "Post Title"}</h2>
                <MarkdownRenderer
                  content={content || "Your content will appear here..."}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default CreatePostPage;
