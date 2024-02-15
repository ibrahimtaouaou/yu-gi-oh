import { useRef, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getCardsQueries } from "../../services/apiCard_temp";
import { useNavigate } from "react-router-dom";

const SearchCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const typeaheadRef = useRef(null);

  const navigate = useNavigate();

  const handleSearch = async (query) => {
    setIsLoading(true);

    const items = await getCardsQueries(query);
    setOptions(items);
    setIsLoading(false);
  };

  const handleClick = (id) => {
    // typeahead.clear();
    navigate(`/card/${id}`);
  };

  // const handleItemClick = (id) => {
  //   setId(id);
  // };

  const filterBy = () => true;

  return (
    <div className="flex flex-shrink items-center">
      <AsyncTypeahead
        ref={typeaheadRef}
        filterBy={filterBy}
        id="async-example"
        isLoading={isLoading}
        labelKey="name"
        minLength={3}
        onSearch={handleSearch}
        options={options}
        useCache={true}
        flip={true}
        placeholder="Search for a Card..."
        size="lg"
        renderMenuItemChildren={(option) => (
          <button
            onClick={() => {
              setTimeout(() => typeaheadRef.current.clear(), 0);
              handleClick(option.id);
            }}
            className="flex items-center"
          >
            <img
              className="size-20 object-scale-down"
              alt={option.name}
              src={option.imageUrl}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = "/no-image.jpg";
              }}
            />
            <span className="text-wrap font-semibold">{option.name}</span>
          </button>
        )}
      />
      {/* <button
        onClick={handleClick}
        className="mx-2 flex h-10 w-10 justify-center rounded-full border bg-stone-100"
      >
        <img
          src="/search.png"
          alt="search"
          className="h-6 w-6 shrink-0 self-center "
        />
      </button> */}
    </div>
  );
};

export default SearchCards;
