// capture reset button
const resetPass = document.getElementById("resetPass");

// attach click listener
resetPass.addEventListener("click", () => {
  let email = document.getElementById("email").value;

  // implement firebase logic
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      window.alert(`Password reset link sent to ${email}.`);
      window.location.assign("login.html");
    })
    .catch((err) => alert(err.message));
});
