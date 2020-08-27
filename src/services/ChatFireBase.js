/** @format */

import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyDMZjiJle6x-HE2pW2v5LACKo0gRrYG3rs",
    authDomain: "chatproj-14b76.firebaseapp.com",
    databaseURL: "https://chatproj-14b76.firebaseio.com",
    projectId: "chatproj-14b76",
    storageBucket: "chatproj-14b76.appspot.com",
    messagingSenderId: "611764691528",
    appId: "1:611764691528:web:bca232b3236dfcc916ae7d",
    measurementId: "G-5HF9WFZQ98"
  };

let firebaseApp = null
if (firebase.apps.length == 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
  firebaseApp = firebase.apps[0]
}

firebaseApp.getCurrentUser = function () {
  return firebaseApp.auth().currentUser
}

firebaseApp.ref = () => {
  return firebaseApp.database().ref()
}

firebaseApp.on = (callback) => {
  return firebaseApp
    .ref()
    .child('chat')
    .limitToLast(1)
    .on('child_added', (snapshot) => {
      // console.log('snapshot', snapshot)
      callback(snapshot)
    })
}

firebaseApp.fetch = (author, callback) => {
  return firebaseApp
    .ref()
    .child('users')
    .child(author)
    .once('value',
      (snapshot) => callback(snapshot),
      (errObj) => { })
}

firebaseApp.chats = (author, callback) => {
  return firebaseApp
    .ref()
    .child('chat')
    .child(author + '-' + 3)
    .on('value', function (snapshot) {
      if (snapshot.val() != null)
        callback(snapshot)
      else alert('No data ')
    },
      function (error) {
        alert(error)
      }
    )
  // .ref('/chat/' + author + '-' + 3).once('value').then(function (snapshot) {
  //   if (snapshot.val() != null) {
  //     callback(snapshot)
  //   }
  //   else {
  //     alert('NochatsAvailable')
  //   }
  // });
  // .ref()
  // .child('chat')
  // .child(author)
  // .once('value', (snapshot) => callback(snapshot),
  //   (errObj) => { }
  // )

}
firebaseApp.chatForAdmin = (callback) => {
  return firebaseApp
    .ref()
    .child('users')
    .child(3)
    .on('value', function (snapshot) {
      if (snapshot.val() != null)
        callback(snapshot)
      else alert('No data ')
    },
      function (error) {
        alert(error)
      }
    )


  // ,
  //   (snapshot) => callback(snapshot),
  //   (errObj) => { })
  //  firebaseApp
  //   .ref('/users/3/').once('value').then(function (snapshot) {
  //     if (snapshot.val() != null) {
  //       callback(snapshot)
  //     }
  //     else {
  //       alert('NochatsAvailable')
  //     }
  //   });
  // .ref()
  // .child('chat')
  // .once('value', (snapshot) => callback(snapshot),
  //   (errObj) => { }
  // )
}
firebaseApp.off = () => firebaseApp.ref().off()

export default firebaseApp
