import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Fetch post
  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        return;
      }

      setPost(data);
    }

    async function fetchComments() {
      const { data } = await supabase
        .from("comments")
        .select()
        .eq("post_id", id)
        .order("created_at", { ascending: true });

      setComments(data || []);
    }

    fetchPost();
    fetchComments();
  }, [id]);

  // Upvote handler
  async function handleUpvote() {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id)
      .select()
      .single();

    if (!error) setPost(data);
  }

  // Delete handler
  async function handleDelete() {
    await supabase.from("posts").delete().eq("id", id);
    navigate("/");
  }

  // Add comment
  async function handleCommentSubmit() {
    if (!comment.trim()) return;

    const { data, error } = await supabase
      .from("comments")
      .insert({
        post_id: id,
        text: comment,
      })
      .select()
      .single();

    if (!error) {
      setComments([...comments, data]);
      setComment("");
    }
  }

  // ------------------------------------------------------------------
  //                          BEAUTIFUL RETURN
  // ------------------------------------------------------------------

  return (
    <div className="post-page-wrapper">

      <div className="post-page-card">

        <h1 className="post-title">{post.title}</h1>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="post-image"
          />
        )}

        <p className="post-description">{post.content}</p>

        <p>
          <strong>Upvotes:</strong> {post.upvotes}
        </p>

        <div className="post-actions">
          <button className="action-btn action-upvote" onClick={handleUpvote}>
            Upvote
          </button>
          <button
            className="action-btn action-edit"
            onClick={() => navigate(`/edit/${id}`)}
          >
            Edit
          </button>
          <button className="action-btn action-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>

        <h2 className="comments-header">Comments</h2>

        <div className="comment-input-section">
          <input
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="comment-add-btn" onClick={handleCommentSubmit}>
            Add Comment
          </button>
        </div>

        {comments.map((c) => (
          <div key={c.id} className="comment-card">
            <p className="comment-text">{c.text}</p>
          </div>
        ))}

      </div>

    </div>
  );
}
