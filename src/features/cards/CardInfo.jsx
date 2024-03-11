// id : 64867422

import { useDispatch, useSelector } from "react-redux";
import { fetchOneCard, getCardFromState } from "./cardSlice";
import CardImage from "./CardImage";
import CardDetails from "./CardDetails";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../ui/Loader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addToHearts,
  getHeartsFromState,
  getLoginStatusFromState,
  removeFromHearts,
} from "../user/userSlice";

function CardInfo() {
  const card = useSelector(getCardFromState);
  const isLoading = useSelector((state) => state.card.status === "loading");
  const dispatch = useDispatch();
  const { id } = useParams();
  const hearts = useSelector(getHeartsFromState);
  const isInHearts = hearts.includes(card.id);
  const status = useSelector(getLoginStatusFromState);
  const isLogged = status === "loggedIn";

  useEffect(
    function () {
      dispatch(fetchOneCard(id));
    },
    [dispatch, id],
  );

  function handleFavorite() {
    isInHearts
      ? dispatch(removeFromHearts(card.id))
      : dispatch(addToHearts({ id: card.id, imageUrl: card.imageUrl }));
  }

  return (
    <div className="mx-auto mt-4 flex flex-col items-center">
      {isLoading && <Loader />}
      <h1 className="font-bold [font-family:'Roboto-Bold',Helvetica]">
        {card.name}
        {isLogged ? (
          <button className="m-1 border border-black" onClick={handleFavorite}>
            {isInHearts ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </button>
        ) : (
          ""
        )}
      </h1>
      <CardImage src={card.imageUrl} alt={card.name} />
      <CardDetails card={card} />
    </div>
  );
}

export default CardInfo;
