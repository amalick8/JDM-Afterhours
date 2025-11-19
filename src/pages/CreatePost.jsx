import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function createPost(e) {
    e.preventDefault();

    console.log("Submitting post:", { title, content, imageUrl });

    const { data, error } = await supabase.from("posts").insert({
      title: title,
      content: content,
      image_url: imageUrl,
      // upvotes and comments use default values so no need to send them
    });

    console.log("INSERT RESULT:", { data, error });

    // Error handling
    if (error) {
      alert("Supabase Error: " + error.message);
      console.error("Supabase Insert Error:", error);
      return;
    }

    // If successful → redirect
    window.location.href = "/";
  }

  return (
    <div className="form-container">
      <h2>Create New Post</h2>

      <form onSubmit={createPost} className="form">
        <input
          required
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
