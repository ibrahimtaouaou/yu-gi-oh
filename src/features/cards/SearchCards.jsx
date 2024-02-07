import { useState } from "react";
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

  return (
    // <div className="relative">
    //   <input
    //     type="text"
    //     placeholder="Search..."
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //     // variant="outlined"
    //     className="w-52 rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 focus:w-auto focus:outline-none focus:ring focus:ring-red-500"
    //   />
    //   <button
    //     onClick={handleSubmit}
    //     // variant="contained"
    //     className="absolute bottom-0 right-0 top-0 m-1 rounded-full border-none  text-center text-xl uppercase"
    //   >
    //     <BsArrowRightCircleFill />
    //   </button>
    // </div>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search card by ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-24 rounded-full bg-blue-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:max-w-36 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchCards;
