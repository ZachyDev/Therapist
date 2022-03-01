
const dbRef = firebase.firestore();
const selectTheraspist = document.getElementById('select-therapist');

// get therapist name
const getTherapist = doc => {
    let therapistName = doc.data().name;
    
    // create option elements
    let nameOption = document.createElement('option');
    nameOption.innerHTML = therapistName;

    selectTheraspist.appendChild(nameOption);
}

    // fetch from firestore
    let colRef = dbRef.collection('profileDetails');
    colRef.get()    
        .then(snapshot => {
            snapshot.forEach(doc => {
                getTherapist(doc);
            })
        })
        .catch(err => alert(err.message))

