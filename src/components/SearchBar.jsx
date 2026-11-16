function Search({ search, setSearch }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="جستجو بر اساس نام، نام خانوادگی، ایمیل یا شماره..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          aria-label="پاک کردن جستجو"
        >
          ×
        </button>
      )}
    </div>
  );
}
export default Search;
