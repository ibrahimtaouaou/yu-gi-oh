// id : 64867422

import { useDispatch, useSelector } from "react-redux";
import { fetchOneCard, getCardFromState } from "./cardSlice";
import CardImage from "./CardImage";
import CardDetails from "./CardDetails";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../ui/Loader";

function CardInfo() {
  const card = useSelector(getCardFromState);
  const isLoading = useSelector((state) => state.card.status === "loading");
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(
    function () {
      dispatch(fetchOneCard(id));
    },
    [dispatch, id],
  );

  return (
    <div className="mx-auto flex flex-col items-center">
      {isLoading && <Loader />}
      <h1 className="font-bold [font-family:'Roboto-Bold',Helvetica]">
        {card.name}
      </h1>
      <CardImage src={card.imageUrl} alt={card.name} />
      <CardDetails card={card} />
    </div>
  );
}

export default CardInfo;
