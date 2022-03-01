// create a reference to database
const db = firebase.firestore();

// get add button
const addRecord = document.getElementById('addRecord');
// capture form
const updateProfile = document.querySelector('.update-profile');

// attach event listener to add  button
addRecord.addEventListener('click', (e) => {
    e.preventDefault();
    let colName = 'profileDetails';
    let name = updateProfile.name.value;
    let email = updateProfile.email.value;
    let location = updateProfile.location.value;
    let phone = updateProfile.phone.value;
    let specification = updateProfile.spec.value;
    // insert records to firestore
    if (colName,name,location,phone,specification) {
        db.collection(colName).add({
            name,
            email,
            location,
            specification,
        })
        .then(() => {
            alert('Records inserted');
        })
        .catch(err => alert(err.message));
    }
    else {
        alert('Fields cannot be empty')
    }
   
})

// add article
const addArticle = document.querySelector('.add-article');

addArticle.addEventListener('submit',(e) => {
    e.preventDefault();

    let articleContent = addArticle.article.value;
    // push to firestore
    if(articleContent) {
        db.collection('articles').add({
            articleContent,
        })
        .then(() => {
            alert('Article inserted');
            // articleContent.reset();
        })
        .catch(err => alert(err.message));
    }
    else{
        alert('The field is required');
    }
})

// function to delete article
const deleteArticle = docId => {
    db.collection('articles').doc(docId).delete()
    .then(() => {
        alert('Record deleted');
    })
    .catch(err => alert(err.message));
}


// get the documents
const getArticles = () => {
    db.collection('articles').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            let docId = doc.id;
            deleteArticle(docId);
        })
    })
}

const deleteBtn = document.getElementById('deleteBtn');

deleteBtn.addEventListener('click',getArticles());