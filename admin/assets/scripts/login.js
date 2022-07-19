const firebaseConfig = {
  apiKey: "AIzaSyCXyTWHr4T1FQpQ5sWVFN1deLS1CUwLF20",
  authDomain: "rt-d4726.firebaseapp.com",
  projectId: "rt-d4726",
  storageBucket: "rt-d4726.appspot.com",
  messagingSenderId: "1080817411924",
  appId: "1:1080817411924:web:e4f9dfac77d2f55b278ac1",
  measurementId: "G-JLY1WQ75EP"
};
firebase.initializeApp(firebaseConfig);

let auth = firebase.auth()
function login() {
  let userEmail = document.querySelector("#email").value
  let userPassoword = document.querySelector("#password").value



  auth.signInWithEmailAndPassword(userEmail, userPassoword)
    .then(loggedUser => {
      location.href = "./index.html"
    }).catch(error => {
      alert("Senha ou Email Errado")
    })
}
if (location.pathname == "/admin/login.html") {
    auth.onAuthStateChanged(user => {
      if (user) {
        location.pathname = "/admin/index.html"
      }
    })
  }
if (location.pathname == "/admin/index.html") {
    auth.onAuthStateChanged(user => {
      if (location.pathname != "/admin/login.html" && !user) {
        location.pathname = "/admin/login.html"
      }
    })
  }
