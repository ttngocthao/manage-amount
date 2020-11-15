import firebase from "firebase/app";
import { Database } from "../firebase";

export const addResource = async (currentUserId, resourceName) => {
  try {
    const res = await Database.collection("resources").add({
      name: resourceName,
      ownerId: currentUserId,
      totalAmount: 0,
      updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
    });
    return {
      status: 200,
      msg: "Successfully added new resource",
      newItem: {
        resourceId: res.id,
        resourceName,
        resourceTotalAmount: 0,
        updatedAt: "now",
      },
      res,
    };
  } catch (error) {
    return { status: 400, msg: "Failed to add new resource", error };
  }
};

export const deleteResource = async (currentUserId, resourceId) => {
  try {
    //delete resource
    const resource = Database.collection("resources").doc(resourceId);
    await resource.delete();
    const resourceDetails = await Database.collection(
      `${currentUserId}-${resourceId}`
    ).get();
    //delete all the record in resourceDetail
    if (resourceDetails.size !== 0) {
      resourceDetails.forEach(
        async (doc) =>
          await Database.collection(`${currentUserId}-${resourceId}`)
            .doc(doc.id)
            .delete()
      );
    }

    return {
      status: 200,
      msg: "Successfully deleted the resource",
      resourceDetails,
      resource,
    };
    //if resourceDetail exist, delete resource details related to that resource
  } catch (error) {
    return { status: 400, msg: "Failed to delete the resource", error };
  }
};

export const getAllResources = async (currentUserId) => {
  try {
    const res = await Database.collection("resources")
      .where("ownerId", "==", currentUserId)
      .get();
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

const updateTotalAmount = async (moneyIn, amount, totalAmount, resourceId) => {
  try {
    let reCalculateTotalAmount;
    if (moneyIn) {
      reCalculateTotalAmount = Number(totalAmount) + Number(amount);
    } else {
      reCalculateTotalAmount = Number(totalAmount) - Number(amount);
    }
    const res = await Database.collection("resources")
      .doc(resourceId)
      .update({
        totalAmount: Math.floor(reCalculateTotalAmount * 100) / 100,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    return { status: 200, msg: "success updated total amount", res };
  } catch (error) {
    return { status: 400, msg: "failed to update total amount", error };
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
    await updateTotalAmount(moneyIn, amount, totalAmount, resourceId);
    return {
      status: 200,
      msg: "successufully added record",
      recordId: res.id,
      ...res,
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
    await updateTotalAmount(moneyIn, amount * -1, totalAmount, resourceId);

    return { status: 200, msg: "successfully delete record" };
  } catch (error) {
    return { status: 400, msg: "failed to delete the record", error };
  }
};

export const updateRecord = async (
  ownerId,
  resourceId,
  recordId,
  moneyIn,
  amount,
  reason,
  totalAmount
) => {
  try {
    const ref = Database.collection(`${ownerId}-${resourceId}`).doc(recordId);
    const res = await ref.update({
      moneyIn,
      amount,
      reason,
    });

    await Database.collection("resources")
      .doc(resourceId)
      .update({
        totalAmount: Math.floor(totalAmount * 100) / 100,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      });

    return { status: 200, msg: "successfully update the record", res };
  } catch (error) {
    return { status: 400, msg: "failed to update the record", error };
  }
};
