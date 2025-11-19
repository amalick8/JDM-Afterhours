import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function loadPost() {
    const { data } = await supabase.from("posts").select().eq("id", id).single();
    setTitle(data.title);
    setContent(data.content);
    setImageUrl(data.image_url);
  }

  async function updatePost(e) {
    e.preventDefault();

    await supabase.from("posts")
      .update({ title, content, image_url: imageUrl })
      .eq("id", id);

    window.location.href = `/post/${id}`;
  }

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <form onSubmit={updatePost} className="form">
      <h2>Edit Post</h2>

      <input required value={title} onChange={(e) => setTitle(e.target.value)} />

      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

      <button type="submit">Save Changes</button>
    </form>
  );
}
