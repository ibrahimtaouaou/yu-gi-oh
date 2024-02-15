import dark from "/DARK.svg";
import wind from "/WIND.svg";
import water from "/WATER.svg";
import fire from "/FIRE.svg";
import light from "/LIGHT.svg";
import earth from "/EARTH.svg";
import divine from "/DIVINE.svg";

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
