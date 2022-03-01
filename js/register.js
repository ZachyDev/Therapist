const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let pass1 = document.getElementById('password1').value;
    let pass2 = document.getElementById('password2').value;
    let username = document.getElementById('username').value;
    
    if( pass1 == pass2 ) {
        firebase.auth().createUserWithEmailAndPassword(email,pass2)
            .then((result) =>{
                result.user.updateProfile({
                    displayName: username
                })
                .then(() => {
                    console.log(result.user.displayName);
                    window.alert('Registration successful, redirecting...');
                     window.location.assign('index.html');
                })
            })
            .catch(err => alert(err.message));
    }
    else {
        window.alert('Passwords do not match!');
    }
})