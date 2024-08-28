import { Outlet } from "react-router-dom";
import Header from "./Header";
import QuickShortcuts from "./QuickShortcuts";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] overflow-auto bg-zinc-200">
      <div className="sticky top-0">
        <Header />
      </div>
      <div className="grid grid-cols-10">
        <div className="bg- bg-bisque col-span-1"></div>
        <div className="bg-floral col-span-8">
          <Outlet />
        </div>
        <div className="bg-bisque col-span-1"></div>
      </div>

      <div className="sticky bottom-0">
        <QuickShortcuts />
      </div>
    </div>
  );
}

export default AppLayout;
