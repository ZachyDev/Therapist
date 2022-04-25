const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", () => {
  let email = document.getElementById("email").value;
  let pass1 = document.getElementById("password1").value;
  let pass2 = document.getElementById("password2").value;

  if (pass1 == pass2) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass2)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            console.log("Email verification sent");
          })
          .catch((err) => console.error(err.message));
        window.alert("Registration successful, redirecting...");
        window.location.assign("../login.html");
      })
      .catch((err) => alert(err.message));
  } else {
    window.alert("Passwords do not match!");
  }
});
