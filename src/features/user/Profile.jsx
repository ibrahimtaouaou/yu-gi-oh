import { useState } from "react";
import { changeUsername } from "../../services/apiUser";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStateUsername,
  getHeartsFromState,
  getImgsFromState,
  getUserIDFromState,
  getUsernameFromState,
} from "./userSlice";
import CreateIcon from "@mui/icons-material/Create";
import CardImage from "../cards/CardImage";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [open, setOpen] = useState(false);
  const username = useSelector(getUsernameFromState);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const userID = useSelector(getUserIDFromState);
  // const hearts = useSelector(getHeartsFromState);
  // const isHeartsEmpty = hearts.length === 0;
  // const imgs = useSelector(getImgsFromState);
  const navigate = useNavigate();

  function handleSave() {
    dispatch(changeStateUsername(input));
    setOpen(false);
    changeUsername(userID, input);
  }

  // function handleImageClick(id) {
  //   navigate(`/card/${id}`);
  // }

  return (
    <div className="flex flex-col items-center">
      <button className="mx-2 px-2" onClick={() => navigate("/user/favorites")}>
        FAVORITES
      </button>
      <div>
        <h1 className="mt-2 font-semibold">
          Hello {username} !
          <button
            className="m-2 px-2 text-xs text-blue-500 underline"
            onClick={() => setOpen(!open)}
          >
            (Change username <CreateIcon fontSize="inherit" />)
          </button>
        </h1>
      </div>
      <div>
        <dialog open={open}>
          <div className="flex flex-col flex-wrap gap-2 border bg-navy1 p-4">
            <div className="self-center font-semibold text-navy3">
              New Username
            </div>
            <input
              className="border px-2 text-center"
              placeholder={username}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              className="w-auto rounded-full border border-navy3 bg-grey px-2 text-navy3 hover:bg-navy3 hover:text-grey"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="w-auto rounded-full border border-navy3 bg-grey px-2 text-navy3 hover:bg-navy3 hover:text-grey"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </dialog>
      </div>
      {/* <h2 className="m-2 text-xl font-semibold text-navy3">My hearts</h2>
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
      </div> */}
    </div>
  );
}

export default Profile;
