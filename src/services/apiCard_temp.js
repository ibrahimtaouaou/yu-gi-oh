import rawData from "../json/light-card-misc.json";
import * as img from "../helper/img/images";

// const customId = 15;
// const id = 64867422;

export async function getCard(_id) {
  const id = Number(_id);
  const localData = localStorage.getItem(`${id}`);
  if (localData) {
    console.log("LOCAL DATA");
    return JSON.parse(localData);
  }
  console.log("NEW DATA");
  const data = rawData;
  const cardInfo = data.data.find((card) => card.id === id);
  const selectedCard = {
    ...cardInfo,
    imageUrl: img[`_${cardInfo.id}`],
  };
  // console.log("🤨🤨 ", selectedCard.imageUrl, img);
  localStorage.setItem(`${id}`, JSON.stringify(selectedCard));
  return selectedCard;
}

export async function getMostViewedCards(num) {
  const localMVCData = localStorage.getItem(`${num}mostViewedCard`);
  if (localMVCData) {
    console.log("LOCAL MVC DATA 💥");
    return JSON.parse(localMVCData);
  }
  console.log("NEW MVC DATA 💥");
  // const res = await fetch("../json/light-card-misc.json");
  // console.log("fetch 🔎: ", res);
  // const data = await res.json();

  // const data = await JSON.parse(rawData);
  const data = rawData;

  const newData = data.data
    .map((card) => card)
    .sort((a, b) => b.misc_info[0].views - a.misc_info[0].views);

  console.log("test");
  const cardInfo = newData.slice(0, num);
  console.log("test");
  const selectedCard = await Promise.all(
    cardInfo.map(async (card) => {
      return { ...card, imageUrl: await img[`_${card.id}`] };
    }),
  );

  localStorage.setItem(`${num}mostViewedCard`, JSON.stringify(selectedCard));
  selectedCard.forEach((card) => {
    if (!localStorage.getItem(`${card.id}`))
      localStorage.setItem(`${card.id}`, JSON.stringify(card));
  });
  return selectedCard;
}
