const createTherapist = document.getElementById('createTherapist');
const firestore = firebase.firestore();

createTherapist.addEventListener('submit', e => {
    e.preventDefault();

    // capture the inputs
    let fullName = createTherapist.name.value;
    let email = createTherapist.email.value;
    let location = createTherapist.location.value;
    let specialization = createTherapist.spec.value;
    let phone = createTherapist.phone.value;
    let imgURL = createTherapist.imageUrl.value;
    let gender = createTherapist.gender.value;

    firestore.collection('therapists').add({
        fullName,
        email,
        location,
        specialization,
        phone,
        imgURL,
        gender,
    })
        .then(() => {
            alert(`Record added to therapist collection`);
            window.location.assign('index.html')
        })
        .catch(err => window.alert(err.message));

})