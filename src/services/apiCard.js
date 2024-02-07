const API_URL = "https://ygo-api.netlify.app/api/cards/";
// const customId = 15;
// const id = 64867422;

export async function getCard(id) {
  const localData = localStorage.getItem(`${id}`);
  if (localData) {
    console.log("LOCAL DATA");
    return JSON.parse(localData);
  }
  console.log("NEW DATA");
  const res = await fetch(`${API_URL}/${id}`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting card");

  const { data } = await res.json();
  localStorage.setItem(`${id}`, JSON.stringify(data));
  return data;
}
