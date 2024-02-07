import { Link } from "react-router-dom";
import btn from "../images/small-btn.png";
import SearchCards from "../features/cards/SearchCards";
import SwipeableTemporaryDrawer from "./Drawer";
import BasicMenu from "./ProfileMenu";

function Header() {
  return (
    // <header className=" flex items-center justify-between bg-yellow-400 px-4 py-3 text-red-500">
    <header className="flex h-16 items-center justify-between border-b-[1px] border-stone-400 bg-white">
      <div className="flex">
        <SwipeableTemporaryDrawer />
        <Link to="/">
          <img src={btn} alt="Logo" className="aspect-square h-12 shrink-0" />
        </Link>
      </div>

      <SearchCards />

      <BasicMenu />
    </header>
  );
}

export default Header;
