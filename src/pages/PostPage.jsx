import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  async function loadPost() {
    const { data } = await supabase.from("posts").select().eq("id", id).single();
    setPost(data);
  }

  async function addComment(e) {
    e.preventDefault();

    const updatedComments = [...post.comments, comment];

    await supabase.from("posts")
      .update({ comments: updatedComments })
      .eq("id", id);

    setComment("");
    loadPost();
  }

  async function upvote() {
    await supabase.from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id);

    loadPost();
  }

  async function deletePost() {
    await supabase.from("posts").delete().eq("id", id);
    window.location.href = "/";
  }

  useEffect(() => {
    loadPost();
  }, []);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-page">
      <h2>{post.title}</h2>

      {post.image_url && <img src={post.image_url} className="post-img" />}

      <p>{post.content}</p>

      <p>Upvotes: {post.upvotes}</p>
      <button onClick={upvote}>Upvote</button>

      <a href={`/edit/${id}`} className="btn">Edit</a>
      <button onClick={deletePost} className="btn danger">Delete</button>

      <h3>Comments</h3>
      {post.comments.map((c, i) => <p key={i}>• {c}</p>)}

      <form onSubmit={addComment}>
        <input
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button>Add Comment</button>
      </form>
    </div>
  );
}
