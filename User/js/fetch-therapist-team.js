const firestore = firebase.firestore();
const therapistContainer = document.getElementById('therapistContainer');
// function to populate data to html

const renderTherapists = doc => {
    console.log(doc.data().imgURL)
    let li = document.createElement('li');
    li.classList.add('col-12','col-md-6', 'col-lg-3');

    // div
    let div = document.createElement('div');
    div.classList.add('cnt-block', 'equal-hight');
    div.style.height = '349px';

    // figure
    let figure = document.createElement('figure');

    // img
    let img = document.createElement('img');
    img.setAttribute('src', doc.data().imgURL);
    img.classList.add('img-responsive');
    figure.appendChild(img);

    // h3
    let therapistName = document.createElement('h3');
    // p
    let spec = document.createElement('p');
    let loc = document.createElement('p');

    // populate data
    therapistName.textContent = doc.data().fullName;
    spec.textContent = doc.data().specialization;
    loc.textContent = doc.data().location;

    div.appendChild(img);
    div.appendChild(therapistName);
    div.appendChild(spec);
    div.appendChild(loc);
    li.appendChild(div);
    therapistContainer.appendChild(li);
}


firestore.collection('therapists').get()
    .then(docs => {
        docs.forEach(doc => {
            renderTherapists(doc);
        })
    })