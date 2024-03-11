import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";
import { fetchMostViewedCards, getMostViewedCardsFromState } from "./cardSlice";
import Loader from "../../ui/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <ImageList sx={{ height: 450 }}>
      {isLoading && <Loader />}
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div" className="bg-stone-600">
          Most Popular Cards
        </ListSubheader>
      </ImageListItem>
      {mostViewedCards.map((item) => (
        <ImageListItem
          onClick={() => handleClick(item.name, item.id)}
          key={item.imageUrl}
        >
          <img
            src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            // subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default MostViewedCards;
