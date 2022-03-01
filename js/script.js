// call Firebase Firestore
const db = firebase.firestore();

// get from
const submitForm = document.querySelector('.update-profile');
// getButton
const addRecord = document.getElementById('addRecord');
addRecord.addEventListener('click', (e) => {
    e.preventDefault();
    
    // add records to the database
    db.collection('therapist-details').add({
        name: submitForm.name.value,
        email: submitForm.email.value,
        location: submitForm.location.value,
        phone: submitForm.phone.value
    })
    .then(() => {
        window.alert('Details saved successfully');
        submitForm.reset();
    })
})


// delete doc function
const deleteDoc = docId => {
    db.collection("therapist-details").doc(docId).delete().then(() => {
    alert("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}
// get deleteBtn 
const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click',deleteDoc());

// get documents then perform delete operation
db.collection('therapist-details').get()
    .then(snapShot => {
        snapShot.forEach(doc => {
            let docId = doc.id;
            deleteDoc(docId)
        })
    })



// db.collection("therapist-details").doc("DC").delete().then(() => {
//     console.log("Document successfully deleted!");
// }).catch((error) => {
//     console.error("Error removing document: ", error);
// });