import Firebase from "firebase/app";

export const userLogIn = async (email, password) => {
  try {
    const res = await Firebase.auth().signInWithEmailAndPassword(
      email,
      password
    );
    return { status: 200, msg: "successfully logged in", res };
  } catch (error) {
    return { status: 400, msg: "failed to log in", error };
  }
};
