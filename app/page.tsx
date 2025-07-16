"use client";

import { useSession } from "next-auth/react";

function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Yuklanmoqda...</p>;
  }

  if (!session) {
    return <p>Iltimos, login qiling.</p>;
  }

  console.log(session);

  return (
    <div className="pt-10">
      <h1 className="text-4xl font-bold text-center mb-4">
        Welcome To Simple Blog
      </h1>
      <p className="text-center text-lg text-muted-foreground font-semibold">
        A clean functional blog focused on great content
      </p>
    </div>
  );
}

export default Home;
