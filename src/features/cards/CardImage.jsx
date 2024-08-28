import { useState } from "react";

function CardImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      className="mb-4 mt-2 h-[281px] w-[193px]"
      alt={alt}
      onLoad={() => {
        setLoaded(true);
      }}
      src={loaded ? src : "/no-image.jpg"}
      onError={(e) => {
        e.target.onError = null;
        e.target.src = "/no-image.jpg";
        e.target.className = "mb-4 mt-2 h-[281px] w-[281px]";
      }}
    />
  );
}

export default CardImage;
