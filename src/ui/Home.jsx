import logo from "../images/logo.png";
// import MostViewedCards from "../features/cards/MostViewedCards";
import MostViewedCards from "../features/cards/MostViewedCards v3";
import ControlledCarousel from "../features/cards/ControlledCarousel";

function Home() {
  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt="logo" className="h-24" />
      <h1>Hello dear User !</h1>
      <p className="mx-2">
        This app has been developped from scratch, including the new API
        &#40;thanks to this wonderful exhaustive API{" "}
        <a
          className="text-blue-500 underline"
          href="https://ygoprodeck.com/api-guide/"
        >
          YGOPRODeck
        </a>
        &#41;, the implementation of a firebase real-time database and a storage
        for the images.
      </p>
      {/* <ControlledCarousel /> */}
      <MostViewedCards />
    </div>
  );
}

export default Home;
