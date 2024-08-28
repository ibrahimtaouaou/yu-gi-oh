import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/"
      ? setValue(0)
      : location.pathname === "/user/favorites"
        ? setValue(1)
        : location.pathname === "/user"
          ? setValue(2)
          : setValue(-1);
  }, [location]);

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          newValue === 0
            ? navigate("/")
            : newValue === 1
              ? navigate("/user/favorites")
              : navigate("/user");
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Box>
  );
}
