import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchCards() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/card/${query}`);
    setQuery("");
  }

  function handleChange(e) {
    setQuery(e.target.value);
  }

  useEffect(function () {
    if (!query) return;
    console.log(query);
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search card by ID"
        value={query}
        onChange={(e) => handleChange(e)}
        className="w-full max-w-24 rounded-full bg-blue-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:max-w-36 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchCards;
