import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  // --------------------------
  // FETCH POST ON LOAD
  // --------------------------
  async function fetchPost() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.error("Fetch error:", error);
    else setPost(data);
  }

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) return <p>Loading...</p>;

  // --------------------------
  // HANDLE UPVOTE
  // --------------------------
  async function handleUpvote() {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id)
      .select()
      .single();

    if (!error) setPost(data);
  }

  // --------------------------
  // ADD COMMENT
  // --------------------------
  async function handleAddComment() {
    if (!newComment.trim()) return;

    const updatedComments = [...post.comments, newComment];

    const { data, error } = await supabase
      .from("posts")
      .update({ comments: updatedComments })
      .eq("id", id)
      .select()
      .single();

    if (!error) {
      setPost(data);
      setNewComment("");
    }
  }

  // --------------------------
  // DELETE COMMENT
  // --------------------------
  async function handleDeleteComment(index) {
    const updated = [...post.comments];
    updated.splice(index, 1);

    const { data, error } = await supabase
      .from("posts")
      .update({ comments: updated })
      .eq("id", id)
      .select()
      .single();

    if (!error) setPost(data);
  }

  // --------------------------
  // DELETE POST
  // --------------------------
  async function handleDeletePost() {
    const ok = confirm("Are you sure you want to delete this post?");
    if (!ok) return;

    await supabase.from("posts").delete().eq("id", id);
    navigate("/");
  }

  return (
    <div className="post-page-wrapper fade-in">
      <div className="post-page-card">

        {/* TITLE */}
        <h1 className="post-page-title">{post.title}</h1>

        {/* IMAGE (FULLY FIXED) */}
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="post-page-img"
          />
        )}

        {/* CONTENT */}
        {post.content && (
          <p className="post-page-content">{post.content}</p>
        )}

        <p className="post-meta">
          Created: {new Date(post.created_at).toLocaleString()}
        </p>

        <p className="post-meta">Upvotes: {post.upvotes}</p>

        {/* BUTTONS */}
        <div className="post-page-buttons">
          <button onClick={handleUpvote} className="btn upvote-btn">
            Upvote
          </button>

          <Link to={`/edit/${post.id}`}>
            <button className="btn edit-btn">Edit</button>
          </Link>

          <button onClick={handleDeletePost} className="btn delete-btn">
            Delete
          </button>
        </div>

        {/* COMMENTS SECTION */}
        <h2 className="comments-title">Comments</h2>

        <div className="comment-input-row">
          <input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="comment-input"
          />
          <button onClick={handleAddComment} className="btn add-comment-btn">
            Add Comment
          </button>
        </div>

        {/* COMMENTS LIST */}
        <div className="comments-list">
          {post.comments.length === 0 && <p>No comments yet.</p>}

          {post.comments.map((c, index) => (
            <div key={index} className="comment-card">
              <p>{c}</p>
              <button
                className="btn delete-comment-btn"
                onClick={() => handleDeleteComment(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
