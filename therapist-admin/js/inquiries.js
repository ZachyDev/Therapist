const db = firebase.firestore();
const contact = document.getElementById('inquiries');


const renderInquiries = (doc) => {

    // fetch data
    let fName = doc.data().fName;
    let email = doc.data().email;
    let subject = doc.data().subject;
    let message = doc.data().message;
  
    let li = document.createElement('li');

    let inqName = document.createElement('p');
    let inqEmail = document.createElement('p');
    let inqSubject = document.createElement('p');
    let inqMsg = document.createElement('p');

    // append data
    inqName.textContent = fName;
    inqEmail.textContent = email;
    inqSubject.innerHTML = subject;
    inqMsg.textContent = message;

    // append to parent
    li.appendChild(inqName);
    li.appendChild(inqEmail);
    li.appendChild(inqSubject);
    li.appendChild(inqMsg);

    contact.appendChild(li);

}

db.collection('inquiries').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            renderInquiries(doc);
        })
    })