const appointments = document.getElementById("appointments");

// creating a ref to firestore
const firestoreDb = firebase.firestore();

firestoreDb.collection("appointments").get()
    .then(doc => {
        let totalAppointments = doc.size;
        appointments.innerHTML = totalAppointments;
    })