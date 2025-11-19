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

    const { data, error } = await query;
    if (!error) setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, [orderBy, searchTerm]);

  return (
    <div className="page-wrapper">
      <div className="container fade-in">

        {/* Centered Header */}
        <div className="header" style={{ textAlign: "center" }}>
          <h1>HobbyHub</h1>
        </div>

        {/* Centered Create Button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <a href="/create" className="btn">Create New Post</a>
        </div>

        {/* Centered Sort + Search */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "25px" }}>
          <SortAndSearchBar
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Fully Centered Posts List */}
        <div className="posts-list" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {posts.length === 0 ? (
            <p style={{ marginTop: "20px", opacity: 0.7 }}>No posts yet — be the first!</p>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>

      </div>
    </div>
  );
}
