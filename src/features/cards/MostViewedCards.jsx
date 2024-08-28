import { useDispatch, useSelector } from "react-redux";
import { fetchMostViewedCards, getMostViewedCardsFromState } from "./cardSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";

function MostViewedCards() {
  const [index, setIndex] = useState(0);
  const mostViewedCards = useSelector(getMostViewedCardsFromState);
  const isLoading = useSelector((state) => state.card.status === "loading");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    function () {
      dispatch(fetchMostViewedCards(10));
    },
    [dispatch],
  );

  function handleSelect(selectedIndex) {
    setIndex(selectedIndex);
  }

  function handleClick(id) {
    navigate(`/card/${id}`);
  }

  function handleChangeIndex(num) {
    if (index === 0 && num === -1) setIndex(9);
    else if (index === 9 && num === 1) setIndex(0);
    else setIndex(index + num);
  }

  return (
    <>
      {/* {mostViewedCards.length !== 0 && (
        <Carousel
          className="mt-8"
          activeIndex={index}
          onSelect={handleSelect}
          interval={null}
          wrap={true}
          indicators={true}
          slide={false}
          variant="dark"
          indicatorLabels
        >
          {isLoading && <Loader />}
          {mostViewedCards?.map((card, i) => {
            return (
              <CarouselItem
                key={card.name}
                itemID={i}
                className="h-54 w-38"
                onClick={() => handleClick(card.id)}
              >
                <h5 className="mb-1 text-center text-xl font-semibold">
                  Most Popular Cards ({i + 1}/10)
                </h5>
                <img
                  src={`${card.imageUrl}`}
                  alt={card.name}
                  loading="lazy"
                  className="size-96 object-scale-down"
                />
              </CarouselItem>
            );
          })}
        </Carousel>
      )} */}
      <h5 className="mb-1 text-center text-xl font-semibold">
        Most Popular Cards ({index + 1}/10)
      </h5>
      <div className="flex">
        <button
          className="m-2 rounded-md px-2 hover:bg-slate-400"
          onClick={() => handleChangeIndex(-1)}
        >
          <NavigateBeforeIcon />
        </button>
        {isLoading && <Loader />}
        {mostViewedCards?.map((card, i) => {
          return (
            <button
              key={`MVC_${card.name}_${i}`}
              onClick={() => handleClick(card.id)}
            >
              <img
                key={`MVC_${card.name}-${i}`}
                src={`${card.imageUrl}`}
                alt={card.name}
                loading="lazy"
                className={`aspect-auto max-h-[350px] object-scale-down ${index !== i ? "hidden" : ""}`}
              />
            </button>
          );
        })}
        <button
          className="m-2 rounded-md px-2 hover:bg-slate-400"
          onClick={() => handleChangeIndex(1)}
        >
          <NavigateNextIcon />
        </button>
      </div>
    </>
  );
}

export default MostViewedCards;
