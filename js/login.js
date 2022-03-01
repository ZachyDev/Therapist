
let userName = document.getElementById('user-link');
userName.innerHTML = 'test100'
loginBtn.addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value;
    if( email && pass ) {
        firebase.auth().signInWithEmailAndPassword(email,pass)
            .then((result) =>{
                // const user = firebase.auth().currentUser;
                 console.log(result.user.displayName)
                 window.alert('Login successful, redirecting...');
                 window.location.assign('therapist-addmin/index.html');
                
                
            })
            .catch(err => alert(err.message));
    }
    else {
        window.alert('Both fields are required');
    }
})

const googleBtn = document.getElementById("googleBtn");

googleBtn.addEventListener('click',() => {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(authProvider)
        .then(() => {
            window.location.assign('home.html');
        })
})