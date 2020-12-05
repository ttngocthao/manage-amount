import { Auth, AuthPersistence } from "../firebase";

export const userLogIn = async (email, password) => {
  try {
    await Auth.setPersistence(AuthPersistence.SESSION);

    await Auth.signInWithEmailAndPassword(email, password);
    return { status: 200, msg: "successfully logged in" };
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
