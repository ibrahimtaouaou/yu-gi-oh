import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/config";

export async function addNewUser(userID) {
  try {
    await setDoc(
      doc(db, `users/${userID}`),
      {
        username: "User",
        hearts: [],
        imgs: [],
        uid: userID,
      },
      { merge: true },
    );
  } catch (error) {
    console.log("Error while adding new User to db : ", error);
  }
}

export async function changeUsername(userID, username) {
  try {
    await setDoc(
      doc(db, `users/${userID}`),
      {
        username: username,
      },
      { merge: true },
    );
  } catch (error) {
    console.log("Error while changing username in db : ", error);
  }
}

export async function changeHearts(userID, hearts, imgs) {
  try {
    await setDoc(
      doc(db, `users/${userID}`),
      {
        hearts: hearts,
        imgs: imgs,
      },
      { merge: true },
    );
  } catch (error) {
    console.log("Error while changing hearts in db : ", error);
  }
}

export async function getUserInfo(userID) {
  try {
    const ref = doc(db, `users/${userID}`);
    const data = await getDoc(ref);
    if (data.exists()) {
      const userInfo = {
        username: data.data().username,
        hearts: data.data().hearts,
        imgs: data.data().imgs,
      };
      return userInfo;
    }
    return "User";
  } catch (error) {
    console.log("Error while getting data from db : ", error);
  }
}

// export async function getUserHearts(userID) {
//   try {
//     const ref = doc(db, `users/${userID}`);
//     const data = await getDoc(ref);
//     if (data.exists()) return data.data().username;
//     return "User";
//   } catch (error) {
//     console.log(error);
//   }
// }
