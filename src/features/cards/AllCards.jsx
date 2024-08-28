import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllCards,
  fetchTotalCardNumber,
  getAllCardsFromState,
  getTotalCardsNumberFromState,
} from "./cardSlice";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CardImage from "./CardImage";

function AllCards() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardPerPage] = useState(30);
  const [sortBy, setSortBy] = useState("name");
  const totalCardsNumber = useSelector(getTotalCardsNumberFromState);
  const totalPages = Math.ceil(totalCardsNumber / cardsPerPage);
  const sortedCards = useSelector(getAllCardsFromState);
  const [currentCards, setCurrentCards] = useState([]);
  const navigate = useNavigate();

  useEffect(
    function () {
      dispatch(fetchTotalCardNumber());
      dispatch(fetchAllCards(sortBy));
    },
    [dispatch, sortBy],
  );

  useEffect(
    function () {
      if (!sortedCards) {
        console.log("pas vide", sortedCards);
        setCurrentCards(sortedCards.slice(0, cardsPerPage));
      } else
        setCurrentCards(
          sortedCards.slice(
            (currentPage - 1) * cardsPerPage,
            currentPage * cardsPerPage,
          ),
        );
    },
    [sortedCards, currentPage, cardsPerPage],
  );

  function handleCardsPerPage(e) {
    const target = parseInt(e.target.value);
    const nextPage = Math.ceil(((currentPage - 1) * cardsPerPage + 1) / target);
    setCurrentPage(nextPage);
    setCardPerPage(target);
    setCurrentCards(
      sortedCards.slice((nextPage - 1) * target, nextPage * target),
    );
  }

  function handleChangePage(_, value) {
    setCurrentPage(value);
    setCurrentCards(
      sortedCards.slice((value - 1) * cardsPerPage, value * cardsPerPage),
    );
  }

  function handleChangeSortBy(e) {
    setSortBy(e.target.value);
    handleChangePage(0, 1);
  }

  function handleGoToPage(e) {
    handleChangePage(0, parseInt(e.target.value));
  }

  function handleImageClick(id) {
    navigate(`/card/${id}`);
  }

  return (
    <div className="grid">
      <div className="flex justify-center">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
          />
        </Stack>
        <select
          className="mx-2 max-h-fit rounded-md px-2"
          id="goToPage"
          defaultValue={""}
          onChange={handleGoToPage}
        >
          <option value="" disabled>
            Go To Page :{" "}
          </option>
          {Array.from(Array(totalPages).keys()).map((page) => (
            <option key={page + 1} value={page + 1}>
              {page + 1}
            </option>
          ))}
        </select>
        <select
          className="mx-2 max-h-fit rounded-md pl-2"
          id="CardsPerPageID"
          defaultValue={""}
          onChange={handleCardsPerPage}
        >
          <option value="" disabled>
            Show :{" "}
          </option>
          <option value={30}> 30 </option>
          <option value={50}> 50 </option>
          <option value={100}> 100 </option>
        </select>

        <select
          className="mx-2 max-h-fit rounded-md px-2"
          id="sortBy"
          defaultValue={""}
          onChange={handleChangeSortBy}
        >
          <option value="" disabled>
            Sort by :
          </option>
          <option value={"name"}>Name</option>
          <option value={"popularity"}>Popularity</option>
          <option value={"type"}>Type</option>
        </select>
      </div>
      <div className=" m-4 grid grid-cols-4 items-center">
        {currentCards?.map((card, i) => (
          <button
            className="px-2"
            key={card.name}
            onClick={() => handleImageClick(card.id)}
          >
            <CardImage src={card.imageUrl} alt={card} />
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
    </div>
  );
}

export default AllCards;
