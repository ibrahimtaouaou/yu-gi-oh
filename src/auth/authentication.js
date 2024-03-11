import { getAuth, connectAuthEmulator } from "firebase/auth";
import { app } from "../config/config";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");
export default auth;
