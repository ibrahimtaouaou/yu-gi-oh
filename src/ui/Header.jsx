import { Link, useNavigate } from "react-router-dom";
import btn from "../images/small-btn.png";
import SearchCards from "../features/cards/SearchCards";
import SwipeableTemporaryDrawer from "./Drawer";
import BasicMenu from "./ProfileMenu";

function Header() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }
  return (
    // <header className=" flex items-center justify-between bg-yellow-400 px-4 py-3 text-red-500">
    <header className="flex h-16 items-center justify-between border-b-[1px] border-stone-400 bg-white">
      <div className="flex">
        <SwipeableTemporaryDrawer />
        <button onClick={handleClick}>
          <img src={btn} alt="Logo" className="aspect-square h-12 shrink-0" />
        </button>
      </div>

      <SearchCards />

      <BasicMenu />
    </header>
  );
}

export default Header;
