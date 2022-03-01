// get the form
const bookAppointmentForm = document.getElementById('add-therapist-form');
const firestoreDb = firebase.firestore();


const fetchId = (name) => {
    firestoreDb.collection("profileDetails").get()
        .then(docs => {
            docs.forEach(doc => {
                console.log(typeof doc.data().id)
                return doc.data().id
            })
        })
        .catch(err => {
            console.log(err.message)
        })

}

// function book appointment
bookAppointmentForm.addEventListener('click', (e) => {
    // prevent page refresh on submit
    e.preventDefault();
    // capture the form fields
    let therapistName = bookAppointmentForm.selectTherapist.value;
    let address = bookAppointmentForm.address.value;
    let phone = bookAppointmentForm.phone.value;
    let appointmentDate = bookAppointmentForm.appointmentDate.value;

    const therapistId = fetchId(therapistName)

    // push
    firestoreDb.collection('profileDetails').doc(therapistId).collection('appointments').add({
        therapistName,
        address,
        phone,
        appointmentDate

    })
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err.message)
    })
})
