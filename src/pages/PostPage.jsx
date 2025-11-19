import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  async function loadPost() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setPost(data);
      setComments(data.comments || []);
    }
  }

  async function upvote() {
    const { data } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id)
      .select()
      .single();

    setPost(data);
  }

  async function submitComment() {
    if (newComment.trim() === "") return;

    const updated = [...comments, newComment];

    const { data } = await supabase
      .from("posts")
      .update({ comments: updated })
      .eq("id", id)
      .select()
      .single();

    setComments(updated);
    setNewComment("");
  }

  async function deletePost() {
    await supabase.from("posts").delete().eq("id", id);
    navigate("/");
  }

  useEffect(() => {
    loadPost();
  }, []);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-page-box">

      {/* IMAGE AT TOP */}
      {post.image_url && (
        <img src={post.image_url} alt="Post" className="post-image-top" />
      )}

      {/* TAG */}
      {post.tag && <div className="post-tag">{post.tag}</div>}

      {/* TITLE */}
      <h2 className="post-title">{post.title}</h2>

      {/* META */}
      <p className="post-meta">
        Created: {new Date(post.created_at).toLocaleString()}
      </p>

      <p className="post-meta">🔥 {post.upvotes} upvotes</p>

      {/* ACTION BUTTONS */}
      <div className="post-actions">
        <button className="upvote-btn" onClick={upvote}>Upvote</button>

        <Link to={`/edit/${id}`}>
          <button className="edit-btn">Edit</button>
        </Link>

        <button className="delete-btn" onClick={deletePost}>Delete</button>
      </div>

      {/* COMMENTS */}
      <h3 className="comments-title">Comments</h3>

      {comments.length === 0 && (
        <p className="no-comments">No comments yet.</p>
      )}

      {comments.map((c, index) => (
        <p key={index} className="comment-text">• {c}</p>
      ))}

      {/* COMMENT INPUT */}
      <div className="comment-row">
        <input
          className="comment-box"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button className="comment-submit" onClick={submitComment}>
          Add
        </button>
      </div>

    </div>
  );
}
