import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import PostCard from "../components/PostCard";
import SortAndSearchBar from "../components/SortAndSearchBar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState("created_at");
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchPosts() {
    let query = supabase
      .from("posts")
      .select()
      .order(orderBy, { ascending: false });

    if (searchTerm.trim() !== "") {
      query = query.ilike("title", `%${searchTerm}%`);
    }

    const { data } = await query;
    setPosts(data || []);
  }

  useEffect(() => {
    fetchPosts();
  }, [orderBy, searchTerm]);

  return (
    <div className="page-wrapper">

      {/* EVERYTHING CENTERED */}
      <div className="home-container">

        {/* Header */}
        <h1 className="main-title">HobbyHub</h1>

        {/* Create Post button */}
        <a href="/create" className="btn create-btn">Create New Post</a>

        {/* Sort/Search */}
        <div className="sort-wrapper">
          <SortAndSearchBar
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Posts */}
        <div className="posts-wrapper">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}

          {posts.length === 0 && (
            <p className="empty-msg">No posts yet. Create one!</p>
          )}
        </div>

      </div>
    </div>
  );
}
