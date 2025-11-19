import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tag, setTag] = useState("");
  const [ownerKey, setOwnerKey] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.from("posts").insert({
      title,
      content,
      image_url: imageUrl,
      tag,
      owner_key: ownerKey,
      upvotes: 0,
      comments: [],
    });

    if (error) alert(error.message);
    else window.location.href = "/";
  }

  return (
    <div className="form-container">
      <h2>Create a New Post</h2>

      <form onSubmit={handleSubmit}>

        <input
          required
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">Select a Tag</option>
          <option value="Build">Build</option>
          <option value="Review">Review</option>
          <option value="Question">Question</option>
          <option value="For Sale">For Sale</option>
          <option value="Spotting">Spotting</option>
        </select>

        <input
          required
          placeholder="Set an owner key (needed to edit/delete)"
          value={ownerKey}
          onChange={(e) => setOwnerKey(e.target.value)}
        />

        <button type="submit">Post</button>
      </form>
    </div>
  );
}
