const logoutUser = document.getElementById('logoutUser');

logoutUser.addEventListener('click', function() {
    firebase.auth().signOut()
        .then(function(){
            alert('Logged out!');
            window.location.assign('./index.html');
        })
})