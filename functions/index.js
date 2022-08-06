const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const serviceAccount = require("./manage-amount-firebase-adminsdk-o7wrf-7e24537c33.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://manage-amount.firebaseio.com",
});

const typeDefs = gql`
  type Profile {
    id: String
    firstname: String
    lastname: String
    email: String
  }

  type Query {
    profiles: [Profile]
    getProfileById(id: String!): Profile
  }

  type Account {
    id: String!
    email: String!
  }
  type Mutation {
    createAccount(email: String!, password: String!): Profile!
    createProfile(
      id: String!
      firstname: String!
      lastname: String!
      email: String!
    ): Profile!
    updateProfile(
      id: String!
      firstname: String
      lastname: String
      email: String
    ): Profile!
    deleteProfile(id: String!): Profile!
  }
`;
const db = admin.database();
const auth = admin.auth();
const resolvers = {
  Query: {
    profiles: () => {
      return db
        .ref("profiles")
        .once("value")
        .then((snap) => snap.val())
        .then((val) => Object.keys(val).map((key) => val[key]));
    },
    getProfileById: async (_, { id }) => {
      const ref = db.ref(`profiles/${id}`);
      const profile = await ref.once("value").then((snap) => snap.val());
      //if cant find, data.getProfileById is null
      return profile;
    },
  },
  Mutation: {
    createAccount: async (_, { email, password }) => {
      //create an account in auth
      const newAccount = await auth.createUser({
        email: email,
        emailVerified: false,
        // phoneNumber: "+11234567890",
        password: password, //must be at least 6 character long
        // displayName: `${firstname} ${lastname}`,
        // photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false,
      });
      return { id: newAccount.uid, email: newAccount.email };
    },

    //===================================================//
    //need to create login, logout mutation//
    //define them in the schema//
    //===================================================//
    createProfile: async (_, { id, firstname, lastname, email }) => {
      //create a profile in realtime db
      const ref = db.ref(`profiles/${id}`);
      await ref.set({
        id: id,
        firstname,
        lastname,
        email,
      });
      const newProfile = await ref.once("value").then((snap) => snap.val());
      // console.log("newProfile", newProfile);
      return newProfile;
    },
    updateProfile: async (_, { ...input }) => {
      const id = input.id;
      const ref = db.ref(`profiles/${id}`);
      // const updatedProfile = { firstname, lastname, email };
      await ref.update({ ...input });
      const updatedProfile = await ref.once("value").then((snap) => snap.val());
      return updatedProfile;
    },
    deleteProfile: async (_, { id }) => {
      const ref = db.ref(`profiles/${id}`);
      const deleteProfile = await ref.once("value").then((snap) => snap.val());
      await ref.remove();
      return deleteProfile;
    },
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/", cors: true });

exports.graphql = functions.https.onRequest(app);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
