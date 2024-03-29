import SearchCards from "../features/cards/SearchCards";
import SwipeableTemporaryDrawer from "./Drawer";
import BasicMenu from "./ProfileMenu";

function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b-[1px] border-stone-400 bg-white">
      <SwipeableTemporaryDrawer />
      <SearchCards />
      <BasicMenu />
    </header>
  );
}

export default Header;
