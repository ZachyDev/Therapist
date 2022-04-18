const firebase_db = firebase.firestore();

function fetchAppointment() {
	firebase_db.collection('appointments').get()
	.then(docs => {
		docs.forEach(doc => )
	})
}