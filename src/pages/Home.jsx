import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import PostCard from "../components/PostCard";
import SortAndSearchBar from "../components/SortAndSearchBar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState("created_at");
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchPosts() {
    let query = supabase.from("posts").select().order(orderBy, { ascending: false });
    
    if (searchTerm.trim() !== "") {
      query = query.ilike("title", `%${searchTerm}%`);
    }

    const { data, error } = await query;
    if (!error) setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, [orderBy, searchTerm]);

  return (
    <div className="container">
      <h1>HobbyHub</h1>
      <a href="/create" className="btn">Create New Post</a>

      <SortAndSearchBar
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="posts-list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
