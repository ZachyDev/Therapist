const db = firebase.firestore();
const contactForm = document.getElementById("contact");

contactForm.addEventListener("submit", e => {
    e.preventDefault();

    let fName = document.getElementById('fName').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;

    
    db.collection('inquiries').add({
        fName,
        email,
        subject,
        message,
    })
    .then(() => {
        alert("Your message has been sent successfully");
    }).catch(err => alert(err.message));

})