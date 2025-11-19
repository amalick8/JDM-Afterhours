import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [ownerKeyInput, setOwnerKeyInput] = useState("");

  async function load() {
    const { data } = await supabase.from("posts").select("*").eq("id", id).single();
    setPost(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function updatePost(e) {
    e.preventDefault();

    if (ownerKeyInput !== post.owner_key) {
      alert("Invalid owner key.");
      return;
    }

    await supabase
      .from("posts")
      .update({
        title: post.title,
        content: post.content,
        image_url: post.image_url,
        tag: post.tag,
      })
      .eq("id", id);

    window.location.href = `/post/${id}`;
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <h2>Edit Post</h2>

      <form onSubmit={updatePost}>
        <input
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />

        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />

        <input
          value={post.image_url}
          onChange={(e) => setPost({ ...post, image_url: e.target.value })}
        />

        <select
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
        >
          <option value="Build">Build</option>
          <option value="Review">Review</option>
          <option value="Question">Question</option>
          <option value="For Sale">For Sale</option>
          <option value="Spotting">Spotting</option>
        </select>

        <input
          placeholder="Enter owner key to confirm"
          value={ownerKeyInput}
          onChange={(e) => setOwnerKeyInput(e.target.value)}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
