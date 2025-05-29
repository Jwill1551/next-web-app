// app/page.js

import Image from "next/image";

// Fetch posts from Strapi
async function getPosts() {
  const res = await fetch('http://localhost:1337/api/posts?populate=*', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer 07fe59bd7ab95aeb8e54df46d66514eefbae84d8b9f282ed8e527ab57ea0b7848a2ba6b812cc3e1f5451dd75fa4ee7de9b71ddcc1df6806188ddd8d2f111b0d53b2ae316837dd4a739a922ff2e89914c772ce9d00d37fe68a97a47936279a1dd2b6e21db5b17a0c70832c51ef9503f9d172732121f4ffc2666a972bd4bd14308',
      'Content-Type': 'application/json', 
    },
    next: { revalidate: 60 }, // Optional: ISR
  });

  const data = await res.json();
  return data.data || [];
}

// Server component
export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="underline">Blog Posts</h1>
      <div className="p-4 container mx-auto">
        <div className="row justify-start">
          {posts.map((post) =>
            <div className="col col-md-6 col-lg-4 mb-4 post_card" key={post.id}>
              <h2>{post.Title}</h2>
              <p>{post.Date}</p>
              <div className="post_description">
                <p>{post.Description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
