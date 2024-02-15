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
  console.log("time 1");
  const newTimeout = setTimeout(
    () => {
      localStorage.clear();
      console.log("time 2 clearing");
      clearTimeout(newTimeout);
    },
    1000 * 60 * 60 * 6,
  );
  currentTimeout = newTimeout;
}

// window.localStorageWithExpiry = {
//   setItem: function (key, value, expiryTime) {
//     let result = {
//       value,
//       expiryTime: Date.now() + expiryTime,
//     };
//     localStorage.setItem(key, JSON.stringify(result));
//   },

//   getItem: function (key) {
//     let data = localStorage.getItem(key);
//     data = JSON.parse(data);

//     if (data.expiryTime <= Date.now()) {
//       localStorage.removeItem(key);
//       return null;
//     }

//     return data.value;
//   },
//   removeItem: function (key) {
//     localStorage.removeItem(key);
//   },
//   clear: function () {
//     localStorage.clear();
//   },
// };

export async function getCardById(_id) {
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
    imageUrl: `/card-img/${folder}/${id}.jpg` || "error",
  };
  localStorage.setItem(`${id}`, JSON.stringify(selectedCard));
  resetTimeout(currentTimeout);
  return selectedCard;
}

export async function getCardByName(name) {
  // const id = Number(_id);
  // const localData = localStorage.getItem(`${name}`);
  // if (localData) {
  //   console.log("LOCAL DATA");
  //   return JSON.parse(localData);
  // }
  // console.log("NEW DATA");
  const data = rawData;
  const cardInfo = await data.data.find((card) => {
    console.log(`${card.name.toLowerCase()} /// ${name.toLowerCase()}`);
    return card.name.toLowerCase() === name.toLowerCase();
  });
  // const folder = getFolder(cardInfo);
  return cardInfo.id;
  // const selectedCard = {
  //   ...cardInfo,
  //   imageUrl: `/card-img/${folder}/${id}.jpg` || "error",
  // };
  // localStorage.setItem(`${name}`, JSON.stringify(selectedCard));
  // resetTimeout(currentTimeout);
  // return selectedCard;
}

export async function getMostViewedCards(num) {
  const localMVCData = localStorage.getItem(`${num}mostViewedCard`);
  if (localMVCData) {
    console.log("LOCAL MVC DATA 💥");
    return JSON.parse(localMVCData);
  }
  console.log("NEW MVC DATA 💥");
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

export async function getCardsQueries(q) {
  // if (query.length <= 3) return;
  const query = q.toLowerCase();
  const data = rawData.data;
  const filtredData = data.filter((card) =>
    card.name.toLowerCase().includes(query),
  );
  const cardsInfo = filtredData.slice(0, 50);

  // const localData = localStorage.getItem(`${id}`);
  // if (localData) {
  //   console.log("LOCAL DATA");
  //   return JSON.parse(localData);
  // }
  // console.log("NEW DATA");
  // // const data = rawData;
  // const cardInfo = data.find((card) => card.id === id);
  return cardsInfo.map((card) => {
    const folder = getFolder(card);
    const id = card.id;
    return {
      ...card,
      imageUrl: `/card-img/${folder}/${id}.jpg` || "error",
    };
  });

  // localStorage.setItem(`${id}`, JSON.stringify(selectedCard));
  // resetTimeout(currentTimeout);
  // return selectedCard;
}

// export async function getCardByName(query) {
//   console.log(query);
// }

// const timout = setTimeout(() => {
//   localStorage.clear();
//   clearTimeout(timout);
// }, 5000);
