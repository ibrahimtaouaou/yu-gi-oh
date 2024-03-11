import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchMostViewedCards, getMostViewedCardsFromState } from "./cardSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import { IconButton, ImageListItemBar } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function MostViewedCards() {
  const mostViewedCards = useSelector(getMostViewedCardsFromState);
  const isLoading = useSelector((state) => state.card.status === "loading");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("ahhhhh");

  useEffect(
    function () {
      dispatch(fetchMostViewedCards(10));
    },
    [dispatch],
  );

  function handleClick(name, id) {
    console.log(`J'ai cliqué sur ${name}`);
    navigate(`/card/${id}`);
  }

  if (Object.keys(mostViewedCards).length === 0) return;

  return (
    <div className="flex flex-wrap justify-around overflow-hidden">
      {isLoading && <Loader />}
      <ImageList
        className="translate-z-0 flex-nowrap overflow-x-auto"
        cols={2.5}
      >
        {mostViewedCards.map((item) => (
          <ImageListItem
            onClick={() => handleClick(item.name, item.id)}
            key={item.img}
          >
            <img
              src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              classes="bg-[linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)]"
              actionIcon={
                <IconButton aria-label={`star ${item.name}`}>
                  <StarBorderIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default MostViewedCards;
