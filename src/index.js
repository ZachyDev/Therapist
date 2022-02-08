import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA81fq2bHjctsjfUXd2i64b3AG1tVioSTU",
    authDomain: "therapist-connect.firebaseapp.com",
    projectId: "therapist-connect",
    storageBucket: "therapist-connect.appspot.com",
    messagingSenderId: "308490251184",
    appId: "1:308490251184:web:57251778e09fe87b164475"
  };
initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db,'therapy');

getDocs(colRef)
  .then(snapshot =>{
      snapshot.forEach(doc =>{
          console.log(doc.data())
      })
  })

const addForm = document.querySelector('.add');

addForm.addEventListener('submit',(e) => {
    e.preventDefault();

    addDoc(colRef, {
        firstname: addForm.fname.value,
        location: addForm.location.value,
    })
    .then(() => {
        addForm.reset();
    })
})