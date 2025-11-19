export default function SortAndSearchBar({ orderBy, setOrderBy, searchTerm, setSearchTerm }) {
  return (
    <div className="sort-search">
      <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
        <option value="created_at">Newest</option>
        <option value="upvotes">Most Upvoted</option>
      </select>

      <input 
        type="text" 
        placeholder="Search by title..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
    </div>
  );
}
