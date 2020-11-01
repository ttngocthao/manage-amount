import { Auth } from "../firebase";

export const userLogIn = async (email, password) => {
  try {
    const res = await Auth.signInWithEmailAndPassword(email, password);
    return { status: 200, msg: "successfully logged in", res };
  } catch (error) {
    return { status: 400, msg: "failed to log in", error };
  }
};

export const userLogOut = async () => {
  try {
    const res = await Auth.signOut();
    return { status: 200, msg: "successfully logged out", res };
  } catch (error) {
    return { status: 400, msg: "failed to log out", error };
  }
};
