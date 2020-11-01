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
