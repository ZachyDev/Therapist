const dbRef = firebase.firestore();
const selectTherapist = document.getElementById('selectTherapist');

// get therapist name
const getTherapist = doc => {
    let therapistName = doc.data().fullName;
    
    // create option elements
    let nameOption = document.createElement('option');
    nameOption.innerHTML = therapistName;

    selectTherapist.appendChild(nameOption);
}

    // fetch from firestore
    let colRef = dbRef.collection('therapists');
    colRef.get()    
        .then(snapshot => {
            snapshot.forEach(doc => {
                getTherapist(doc);
            })
        })
        .catch(err => alert(err.message))

// book appointmemt
const bookAppointment = document.getElementById('bookAppointment');

bookAppointment.addEventListener('submit', e => {
    e.preventDefault();
    let fullName = bookAppointment.name.value;
    let email = bookAppointment.email.value;
    let service = bookAppointment.service.value;
    let phone = bookAppointment.phone.value;
    let appointmentDate = bookAppointment.date.value;
    let therapistSelect = bookAppointment.therapistSelect.value;

    dbRef.collection('appointments').add({
        fullName,
        email,
        service,
        phone,
        appointmentDate,
        therapistSelect
    })
    .then(() => {
        alert('Appointment has been booked  successfully');
        bookAppointment.reset();
    })
    .catch(err => alert(err.message));
})
