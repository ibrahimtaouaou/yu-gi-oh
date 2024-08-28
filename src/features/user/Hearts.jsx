import { useSelector } from "react-redux";
import CardImage from "../cards/CardImage";
import { getHeartsFromState, getImgsFromState } from "./userSlice";
import { useNavigate } from "react-router-dom";

function Hearts() {
  const hearts = useSelector(getHeartsFromState);
  const isHeartsEmpty = hearts.length === 0;
  const imgs = useSelector(getImgsFromState);

  const navigate = useNavigate();

  function handleImageClick(id) {
    navigate(`/card/${id}`);
  }

  return (
    <div>
      <h2 className="m-2 text-xl font-semibold text-navy3">My hearts</h2>
      <div className="flex justify-center">
        {isHeartsEmpty ? (
          <p className="mt-4 italic">
            No cards to show. Add cards to your favorites to display them here!
          </p>
        ) : (
          <div className=" m-4 grid grid-cols-1 items-center">
            {hearts.map((heart, i) => (
              <button key={heart} onClick={() => handleImageClick(heart)}>
                <CardImage src={imgs[i]} alt={heart} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Hearts;
