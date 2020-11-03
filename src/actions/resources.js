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

export const getResourceDetails = async (resourceId) => {
  try {
    const res = await Database.collection("resourceDetails")
      .doc(resourceId)
      .get();
    const details = res.data().details.map((item) => ({
      moneyIn: item.moneyIn,
      amount: item.amount,
      reason: item.reason,
      createdAt: item.createdAt.toDate().toDateString(),
    }));
    console.log("details", details);
    return {
      status: 200,
      msg: "successfully got the details of this resource",
      data: details,
      dataName: res.data().name,
    };
  } catch (error) {
    return { status: 400, msg: "failed to get resource details", error };
  }
};
