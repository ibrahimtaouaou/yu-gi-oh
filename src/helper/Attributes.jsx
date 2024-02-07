import dark from "../images/DARK.svg";
import wind from "../images/WIND.svg";
import water from "../images/WATER.svg";
import fire from "../images/FIRE.svg";
import light from "../images/LIGHT.svg";
import earth from "../images/EARTH.svg";
import divine from "../images/DIVINE.svg";

function Attributes({ attribute }) {
  let att;
  switch (attribute) {
    case "WIND":
      att = wind;
      break;
    case "DARK":
      att = dark;
      break;
    case "WATER":
      att = water;
      break;
    case "EARTH":
      att = earth;
      break;
    case "LIGHT":
      att = light;
      break;
    case "DIVINE":
      att = divine;
      break;
    case "FIRE":
      att = fire;
      break;
    default:
      break;
  }

  return (
    <div className="group relative flex justify-center">
      <img
        src={att}
        alt={att}
        className="h-8 w-8 object-scale-down hover:select-text"
      />
      <span className="absolute top-8 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        {attribute}
      </span>
    </div>
  );
}

export default Attributes;
