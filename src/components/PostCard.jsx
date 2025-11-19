import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link
      to={`/post/${post.id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div className="post-card fade-in">
        
        {/* IMAGE */}
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="post-card-img"
          />
        )}

        <h3>{post.title}</h3>

        <p className="post-meta">
          Created: {new Date(post.created_at).toLocaleString()}
        </p>

        <p className="post-meta">Upvotes: {post.upvotes}</p>
      </div>
    </Link>
  );
}
