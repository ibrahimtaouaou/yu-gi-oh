import { useDispatch, useSelector } from "react-redux";
import { fetchMostViewedCards, getMostViewedCardsFromState } from "./cardSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";

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
      console.log("UseEffect here");
      dispatch(fetchMostViewedCards(10));
    },
    [dispatch],
  );

  function handleSelect(selectedIndex) {
    setIndex(selectedIndex);
  }

  function handleClick(name, id) {
    console.log(`J'ai cliqué sur ${name}`);
    navigate(`/card/${id}`);
  }

  return (
    <>
      {mostViewedCards.length !== 0 && (
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
                onClick={() => handleClick(card.name, card.id)}
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
      )}
    </>
  );
}

export default MostViewedCards;
