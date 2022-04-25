// firestore Ref
let numberOfArticles = document.querySelector('#numberOfArticles');
let newArticleBtn = document.getElementById('newArticleBtn');

const db = firebase.firestore();

db.collection('articles').get()
    .then(articles => {
        let articleSize = articles.size;
        numberOfArticles.innerHTML = articleSize;
    })
    .catch(err => alert(err.message));

newArticleBtn.addEventListener('click', function() {
    window.location.assign('./articles/article.html');
})