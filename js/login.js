const loginBtn = document.getElementById("loginBtn");

let userName = document.getElementById("user-link");
// userName.innerHTML = 'test100'
loginBtn.addEventListener("click", () => {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  if (email && pass) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((result) => {
        if (result.user.emailVerified) {
          window.alert("Login successful, redirecting...");
          console.log(result.user);
          window.location.assign("../User/index.html");
        } else {
          alert(`The email ${result.user.email} is not verified`);
        }
      })
      .catch((err) => alert(err.message));
  } else {
    window.alert("Both fields are required");
  }
});

const googleBtn = document.getElementById("googleBtn");

googleBtn.addEventListener("click", () => {
  const authProvider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(authProvider)
    .then(() => {
      window.location.assign("home.html");
    });
});
