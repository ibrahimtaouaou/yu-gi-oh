// const API_URL_CARD = "http://localhost:3000/api/cards";
const API_URL_MVC = "http://localhost:3000/api/cards/mostViewed";
const API_URL_CARD = "https://ygo-api.netlify.app/api/cards";
// const API_URL_MVC = "https://ygo-api.netlify.app/api/cards/mostViewed";

// const customId = 15;
// const id = 64867422;

export async function getCard(id) {
  const localData = localStorage.getItem(`${id}`);
  if (localData) {
    console.log("LOCAL DATA");
    return JSON.parse(localData);
  }
  console.log("NEW DATA");
  const res = await fetch(`${API_URL_CARD}/${id}`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting card");

  const { data } = await res.json();
  localStorage.setItem(`${id}`, JSON.stringify(data));
  return data;
}

export async function getMostViewedCards(num) {
  const localData = localStorage.getItem(`${num}mostViewedCard`);
  if (localData) {
    console.log("LOCAL DATA");
    return JSON.parse(localData);
  }
  console.log("NEW DATA");
  const res = await fetch(`${API_URL_MVC}/${num}`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting card");

  const { data } = await res.json();
  console.log("data : ", data);
  localStorage.setItem(`${num}mostViewedCard`, JSON.stringify(data));
  data.forEach((card) => {
    if (!localStorage.getItem(`${card.id}`))
      localStorage.setItem(`${card.id}`, JSON.stringify(card));
  });
  return data;
}
