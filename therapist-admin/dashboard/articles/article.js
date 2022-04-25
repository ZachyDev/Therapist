const articleForm = document.getElementById('articleForm');
const db = firebase.firestore();
articleForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // get the inputs
    let title = articleForm.title.value;
    let author = articleForm.author.value;
    let publicationDate = articleForm.publicationDate.value;
    let articleContent = articleForm.articleContent.value;

    let colRef = 'articles';
    if (title,author,publicationDate,articleContent) {
        db.collection(colRef).add({
            title,
            author,
            publicationDate,
            articleContent,
        })
        .then(() => {
            alert(`Article has been added to ${ colRef } collection.`)
            articleForm.reset();
            window.location.assign('../index.html')
        })
        .catch(err => alert(err.message));
    }
    else {
        alert('All fields are required');
    }


})