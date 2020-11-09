import firebase from "firebase/app";
import { Database } from "../firebase";

export const getAllResources = async () => {
  try {
    const res = await Database.collection("resources").get();
    let listOfResources = [];
    res.forEach((doc) => {
      listOfResources.push({
        resourceId: doc.id,
        resourceName: doc.data().name,
        resourceTotalAmount: doc.data().totalAmount,
        updatedAt: doc.data().updatedAt.toDate().toDateString(),
      });
    });
    return {
      status: 200,
      msg: "successfully got all resources",
      data: listOfResources,
    };
  } catch (error) {
    return { status: 400, msg: "failed to get all resources", error };
  }
};

export const getResourceDetails = async (userId, resourceId, name) => {
  try {
    const ref = Database.collection(`${userId}-${resourceId}`)
      .orderBy("createdAt", "desc")
      .limit(10);

    let data = [];
    const res = await ref.get();
    if (res.size === 0) {
      const createResourceDetailsRes = await createNewResouceDetails(
        userId,
        resourceId,
        name
      );
      console.log(createResourceDetailsRes);
    }

    res.forEach((doc) => {
      if (doc.data().amount > 0) {
        data.push({
          recordId: doc.id,
          resourceId: doc.data().resourceId,
          owner: doc.data().owner,
          moneyIn: doc.data().moneyIn,
          amount: doc.data().amount,
          reason: doc.data().reason,
          createdAt: doc.data().createdAt.toDate().toDateString(),
        });
      }
    });

    return {
      status: 200,
      msg: "successfully got the details of this resource",
      data: data,
      dataName: name,
    };
  } catch (error) {
    return { status: 400, msg: "failed to get resource details", error };
  }
};

export const createNewResouceDetails = async (userId, resourceId, name) => {
  try {
    const ref = Database.collection(`${userId}-${resourceId}`);

    const res = await ref.add({
      name: name,
      resourceId: resourceId,
      amount: 0,
      owner: userId,
      moneyIn: true,
      reason: "Init the resource",
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    });
    return { status: 200, msg: "successfully created", res };
  } catch (error) {
    return { status: 400, msg: "failed to create it", error };
  }
};

export const addNewRecord = async (
  name,
  resourceId,
  amount,
  userId,
  moneyIn,
  reason,
  totalAmount
) => {
  try {
    //add new record
    const ref = Database.collection(`${userId}-${resourceId}`);

    const res = await ref.add({
      name: name,
      resourceId: resourceId,
      amount: amount,
      owner: userId,
      moneyIn: moneyIn,
      reason: reason,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    });

    //update total amount in the resource
    await Database.collection("resources")
      .doc(resourceId)
      .update({
        totalAmount: Math.floor(totalAmount * 100) / 100,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    return {
      status: 200,
      msg: "successufully added record",
      res,
    };
  } catch (error) {
    return { status: 400, msg: "failed to add a record", error };
  }
};

export const deleteRecord = async (
  ownerId,
  resourceId,
  recordId,
  totalAmount,
  moneyIn,
  amount
) => {
  try {
    const ref = Database.collection(`${ownerId}-${resourceId}`);
    await ref.doc(recordId).delete();
    //update the resource.totalAmount
    //if moneyin ? totalAmount - amount : totalAmount + amount
    let reCalculateTotalAmount;
    if (moneyIn) {
      reCalculateTotalAmount = totalAmount - amount;
    } else {
      reCalculateTotalAmount = totalAmount + amount;
    }
    await Database.collection("resources")
      .doc(resourceId)
      .update({
        totalAmount: Math.floor(reCalculateTotalAmount * 100) / 100,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      });

    return { staus: 200, msg: "successfully delete record" };
  } catch (error) {
    return { status: 400, msg: "failed to delete the record", error };
  }
};
