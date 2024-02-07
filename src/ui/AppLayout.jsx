import { Outlet } from "react-router-dom";
import Header from "./Header";
import QuickShortcuts from "./QuickShortcuts";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] overflow-auto bg-zinc-200">
      <div className="sticky top-0">
        <Header />
      </div>

      <Outlet />
      <div className="sticky bottom-0">
        <QuickShortcuts />
      </div>
    </div>
  );
}

export default AppLayout;
