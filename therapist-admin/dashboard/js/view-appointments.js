const dbRef = firebase.firestore();
const appointments = document.getElementById('appointments');


const renderAppointments = (doc) => {
    // fetch data
    let fullName = doc.data().fullName;
    let apDate = doc.data().appointmentDate;
    let email = doc.data().email;
    let phone = doc.data().phone;
    let service = doc.data().service;
    let therapistSelected = doc.data().therapistSelect;
   
  
    let li = document.createElement('li');

    let clName = document.createElement('p');
    let clEmail = document.createElement('p');
    let clPhone = document.createElement('p');
    let clDate = document.createElement('p');
    let clService = document.createElement('p');
    let clTherapist = document.createElement('p');

    // append data
    clName.textContent = "Name: " + fullName;
    clEmail.textContent = "Email: " + email;
    clPhone.textContent = "Phone Number: " + phone;
    clDate.textContent = "Appointment Date: " + apDate;
    clService.textContent = "Service: " + service;
    clTherapist.textContent ="Therapist Selected: " + therapistSelected;

    // append to parent
    li.appendChild(clName);
    li.appendChild(clEmail);
    li.appendChild(clPhone);
    li.appendChild(clDate);
    li.appendChild(clService);
    li.appendChild(clTherapist);

    appointments.appendChild(li);

}

dbRef.collection('appointments').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            renderAppointments(doc);
        })
    })