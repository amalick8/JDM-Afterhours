export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <a href={`/post/${post.id}`}>
        <h3>{post.title}</h3>
        <p>Created: {new Date(post.created_at).toLocaleString()}</p>
        <p>Upvotes: {post.upvotes}</p>
      </a>
    </div>
  );
}
