import rawData from "../json/light-card-misc.json";
// import * as img from "../helper/img/images";

// const customId = 15;
// const id = 64867422;

function getFolder(cardInfo) {
  let folder = "";
  if (cardInfo.type.includes("onster")) folder = "monster";
  else if (cardInfo.type.includes("rap")) folder = "trap";
  else if (cardInfo.type.includes("pell")) folder = "spell";
  else if (cardInfo.type.includes("kill")) folder = "skill";
  else if (cardInfo.type.includes("oken")) folder = "token";

  return folder;
}

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
  const folder = getFolder(cardInfo);
  const selectedCard = {
    ...cardInfo,
    // imageUrl: img[`_${cardInfo.id}`],
    imageUrl: `/src/images/card-img/${folder}/${id}.jpg` || "error",
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
      const folder = getFolder(card);
      return {
        ...card,
        imageUrl: `/src/images/card-img/${folder}/${card.id}.jpg`,
      };
    }),
  );

  localStorage.setItem(`${num}mostViewedCard`, JSON.stringify(selectedCard));
  selectedCard.forEach((card) => {
    if (!localStorage.getItem(`${card.id}`))
      localStorage.setItem(`${card.id}`, JSON.stringify(card));
  });
  return selectedCard;
}
