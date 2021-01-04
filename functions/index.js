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
  }
  type Mutation {
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
  }
`;
const db = admin.database();
const resolvers = {
  Query: {
    profiles: () => {
      return db
        .ref("profiles")
        .once("value")
        .then((snap) => snap.val())
        .then((val) => Object.keys(val).map((key) => val[key]));
    },
  },
  Mutation: {
    createProfile: async (_, { id, firstname, lastname, email }) => {
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
    updateProfile: async (_, { id, firstname, lastname, email }) => {
      const ref = db.ref(`profile/${id}`);
      const updatedProfile = { firstname, lastname, email };
      await ref.update(updatedProfile);
      return { id, ...updatedProfile }; //stop here, not test yet
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
