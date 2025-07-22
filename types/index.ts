interface Post {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: User;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  image: string;
}
