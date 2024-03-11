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
  const hearts = useSelector(getHeartsFromState);
  const isHeartsEmpty = hearts.length === 0;
  const imgs = useSelector(getImgsFromState);
  const navigate = useNavigate();

  function handleSave() {
    dispatch(changeStateUsername(input));
    setOpen(false);
    changeUsername(userID, input);
  }

  function handleImageClick(id) {
    navigate(`/card/${id}`);
  }

  return (
    <div className="flex flex-col items-center">
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
          <div className="bg-navy1 flex flex-col flex-wrap gap-2 border p-4">
            <div className="text-navy3 self-center font-semibold">
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
              className="bg-grey text-navy3 hover:bg-navy3 hover:text-grey border-navy3 w-auto rounded-full border px-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-grey text-navy3 hover:bg-navy3 hover:text-grey border-navy3 w-auto rounded-full border px-2"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </dialog>
      </div>
      <h2 className="text-navy3 m-2 text-xl font-semibold">My hearts</h2>
      <div className="flex justify-center">
        {isHeartsEmpty ? (
          <p className="mt-4 italic">
            No cards to show. Add cards to your favorites to display them here!
          </p>
        ) : (
          <div className=" m-4 grid grid-cols-5 gap-2">
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

export default Profile;
