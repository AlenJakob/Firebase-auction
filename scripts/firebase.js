
 let firebaseConfig = {
    apiKey: "AIzaSyBT8l15j0FQj2cSAxEzn7N9go3oui73wok",
    authDomain: "jax-auction.firebaseapp.com",
    databaseURL: "https://jax-auction.firebaseio.com",
    projectId: "jax-auction",
    appId: "1:1086968407801:web:7c796080bf4f2959ec6428",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  const auth = firebase.auth();
  const db = firebase.firestore();

  console.log(db)