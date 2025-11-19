// PostPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadPost() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) setPost(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPost();
  }, [id]);

  // 🔥 Upvote
  async function handleUpvote() {
    await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id);

    loadPost();
  }

  // ✏️ Add Comment
  async function addComment() {
    if (!commentText.trim()) return;

    const newComments = [...post.comments, commentText];

    await supabase
      .from("posts")
      .update({ comments: newComments })
      .eq("id", id);

    setCommentText("");
    loadPost();
  }

  // ❌ Delete
  async function deletePost() {
    await supabase.from("posts").delete().eq("id", id);
    navigate("/");
  }

  if (loading) return <p className="loading">Loading...</p>;
  if (!post) return <p className="loading">Post not found.</p>;

  return (
    <div className="page-box">
      <div className="post-page-card">

        {/* TAG */}
        {post.tag && <div className="tag-badge">{post.tag}</div>}

        {/* TITLE */}
        <h1 style={{ marginBottom: "10px" }}>{post.title}</h1>

        {/* IMAGE */}
        {post.image_url && (
          <img
            className="post-page-img"
            src={post.image_url}
            alt="post"
          />
        )}

        {/* META */}
        <p className="meta">
          Created: {new Date(post.created_at).toLocaleString()}
        </p>
        <p className="upvotes">🔥 {post.upvotes} upvotes</p>

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
          <button className="btn" onClick={handleUpvote}>Upvote</button>
          <Link className="btn" to={`/edit/${post.id}`}>Edit</Link>
          <button className="btn" onClick={deletePost} style={{ background: "#ff3b3b" }}>
            Delete
          </button>
        </div>

        {/* COMMENTS */}
        <div className="comment-box">
          <h2>Comments</h2>

          {post.comments.length === 0 && (
            <p style={{ color: "var(--text-dim)" }}>No comments yet.</p>
          )}

          {post.comments.map((c, i) => (
            <div key={i} className="comment">{c}</div>
          ))}

          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="comment-input"
              style={{ flex: 1 }}
            />
            <button className="btn" onClick={addComment}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
