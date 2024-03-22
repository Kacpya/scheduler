const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
admin.initializeApp();
exports.postschedule = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const currentTime = admin.firestore.Timestamp.now();
    request.body.timestamp = currentTime;
    return admin.firestore().collection("users")
        .collection("schedules").add({
          schedule: request.body.data.schedule,
          timestamp: request.body.timestamp}).then(() => {
          response.send({"data": "Saved in Database"});
        });
  });
});

exports.postuserschedule = functions.https.onCall((data, context) => {
  // context.auth contains information about the user, if they are logged in etc.
  const currentTime = admin.firestore.Timestamp.now();
  data.timestamp = currentTime;

  if (typeof context.auth === 'undefined') {
    // request is made from an anonymous user
    return admin.firestore().collection('userEvents').add({ data: data }).then(() => {
      return "Data saved in Firestore"
    });
  }
  else {
    // Get the UID from the context
    data.uid = context.auth.uid;

    return admin.firestore().collection('userEvents').add({ data: data }).then(() => {
      return "Data saved in Firestore"
    });
  }
});

exports.getevents = functions.https.onRequest((request,
    response) => {
  cors(request, response, () => {
    // 1. Connect to our Firestore database
    const myData = [];
    admin.firestore().collection("userEvents").orderBy("timestamp",
        "desc").get().then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents");
        response.send("No data in database");
        return;
      }
      snapshot.forEach((doc) => {
        myData.push(doc.data());
      });
      // 2. Send data back to client
      response.send({data: myData});
    });
  });
});

exports.securefunction = functions.https.onCall((data, context) => {
  if (typeof context.auth === "undefined") {
    // request is made from user that is logged in
    return "User is not logged in";
  } else {
    return "User is logged in";
  }
});

exports.adduser = functions.https.onCall((data, context) => {
  console.log("add user data ", data);
  // context.auth contains information about the user,:
  // if they are logged in etc.
  if (typeof context.auth === "undefined") {
  // request is made from user that is logged in
    return "User is not logged in";
  } else {
  // add new user document to the collection users
    return admin.firestore().collection("users").add(data)
        .then(()=> {
          return {data: "Saved user in the database"};
        });
  }
});
