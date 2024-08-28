import rawData from "../json/light-card-misc.json";
// import * as img from "../helper/img/images";

// const customId = 15;
// const id = 64867422;

let currentTimeout = null;

function getFolder(cardInfo) {
  let folder = "";
  if (cardInfo.type.includes("onster")) folder = "monster";
  else if (cardInfo.type.includes("rap")) folder = "trap";
  else if (cardInfo.type.includes("pell")) folder = "spell";
  else if (cardInfo.type.includes("kill")) folder = "skill";
  else if (cardInfo.type.includes("oken")) folder = "token";

  return folder;
}

function resetTimeout(timeout) {
  timeout && clearTimeout(timeout);
  const newTimeout = setTimeout(
    () => {
      localStorage.clear();
      clearTimeout(newTimeout);
    },
    1000 * 60 * 60 * 6,
  );
  currentTimeout = newTimeout;
}

export async function getTotalCardNumber() {
  const localData = localStorage.getItem(`totalCards`);
  if (localData) {
    return JSON.parse(localData);
  }
  const data = rawData;
  const num = data.data.reduce((acc, _) => {
    return acc + 1;
  }, 0);
  localStorage.setItem(`totalCards`, JSON.stringify(num));
  return num;
}

export async function getCardById(_id) {
  const id = Number(_id);
  const localData = localStorage.getItem(`${id}`);
  if (localData) {
    // console.log("LOCAL DATA");
    return JSON.parse(localData);
  }
  // console.log("NEW DATA");
  const data = rawData;
  const cardInfo = data.data.find((card) => card.id === id);
  const folder = getFolder(cardInfo);
  const selectedCard = {
    ...cardInfo,
    imageUrl: `/card-img/${folder}/${id}.jpg` || "error",
  };
  localStorage.setItem(`${id}`, JSON.stringify(selectedCard));
  resetTimeout(currentTimeout);
  return selectedCard;
}

//Not Used
export async function getCardByName(name) {
  const data = rawData;
  const cardInfo = await data.data.find((card) => {
    return card.name.toLowerCase() === name.toLowerCase();
  });
  return cardInfo.id;
}

export async function getMostViewedCards(num) {
  const localMVCData = localStorage.getItem(`${num}mostViewedCard`);
  if (localMVCData) {
    return JSON.parse(localMVCData);
  }
  const data = rawData;

  const newData = data.data
    .map((card) => card)
    .sort((a, b) => b.misc_info[0].views - a.misc_info[0].views);

  const cardInfo = newData.slice(0, num);
  const selectedCard = await Promise.all(
    cardInfo.map(async (card) => {
      const folder = getFolder(card);
      return {
        ...card,
        imageUrl: `/card-img/${folder}/${card.id}.jpg`,
      };
    }),
  );

  localStorage.setItem(`${num}mostViewedCard`, JSON.stringify(selectedCard));
  resetTimeout(currentTimeout);
  selectedCard.forEach((card) => {
    if (!localStorage.getItem(`${card.id}`)) {
      localStorage.setItem(`${card.id}`, JSON.stringify(card));
      resetTimeout(currentTimeout);
    }
  });
  return selectedCard;
}

export async function getAllCardsSortedBy(sort) {
  // const localSortedData = localStorage.getItem(`${sort}SortedCards`);
  // if (localSortedData) {
  //   return JSON.parse(localSortedData);
  // }
  const data = rawData;
  const newData = data.data
    .map((card) => card)
    .sort((a, b) => {
      let sortedCards;
      sort === "type"
        ? (sortedCards = a.type.localeCompare(b.type))
        : sort === "name"
          ? (sortedCards = b.name - a.name)
          : (sortedCards = b.misc_info[0].views - a.misc_info[0].views);
      return sortedCards;
    });

  const cardsInfo = await Promise.all(
    newData.map(async (card) => {
      const folder = getFolder(card);
      return {
        ...card,
        imageUrl: `/card-img/${folder}/${card.id}.jpg`,
      };
    }),
  );
  // localStorage.setItem(`${sort}SortedCards`, JSON.stringify(cardsInfo));
  // resetTimeout(currentTimeout);
  // cardsInfo.forEach((card) => {
  //   if (!localStorage.getItem(`${card.id}`)) {
  //     localStorage.setItem(`${card.id}`, JSON.stringify(card));
  //     resetTimeout(currentTimeout);
  //   }
  // });
  return cardsInfo;
}

export async function getCardsQueries(q) {
  const query = q.toLowerCase();
  const data = rawData.data;
  const filtredData = data.filter((card) =>
    card.name.toLowerCase().includes(query),
  );
  const cardsInfo = filtredData.slice(0, 50);
  return cardsInfo.map((card) => {
    const folder = getFolder(card);
    const id = card.id;
    return {
      ...card,
      imageUrl: `/card-img/${folder}/${id}.jpg` || "error",
    };
  });
}
