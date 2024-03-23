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
  console.log("postuserschedule start");
  // context.auth contains information about the user, if they are logged in etc.
  const currentTime = admin.firestore.Timestamp.now();
  //data.timestamp = currentTime;

  if (typeof context.auth === 'undefined') {
    // request is made from an anonymous user
    return admin.firestore().collection('userEvents').add({ data: data }).then(() => {
      console.log("postuserschedule end");
      return "Data saved in Firestore"
    });
  }
  else {
    // Get the UID from the context
    data.uid = context.auth.uid;

    return admin.firestore().collection('userEvents').add({ data: data }).then(() => {
      console.log("postuserschedule end");
      return "Data saved in Firestore"
    });
  }
  
});


exports.getevents = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // 1. Connect to our Firestore database
    let myData = []
    return admin.firestore().collection('userEvents').get().then((snapshot) => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        response.send({ data: 'No data in database' });
        return;
      }
      snapshot.forEach(doc => {
        myData.push(Object.assign(doc.data(), { id: doc.id }));
      });
      // 2. Send data back to client
      response.send({ data: myData });
    });
  });
});

exports.deleteuserevent = functions.https.onCall((data, context) => {
  if (typeof context.auth === 'undefined') {
    // request is made from an anonymous user
    throw new functions.https.HttpsError('permission-denied', 'Anonymous users cannot delete events');
  }
  else {
    return admin.firestore().collection('userEvents').doc(data.id).get().then((doc) => {
      if (!doc.exists) {
        // 1. Check if the document exists, throw error if not
        throw new functions.https.HttpsError('not-found', 'No event found matching the id');
      } else if (doc.data().data.uid != context.auth.uid) {
        // 2. Check if the user owns the document, otherwise throw error
        throw new functions.https.HttpsError('permission-denied', 'You do not have sufficient permissions to delete this event');
      } else {
        // 3. If the user created the document then delete it
        return doc.ref.delete().then(() => {
          return 'Document successfully deleted'
        });
      }
    });
  }
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
