const firestore_db = firebase.firestore();
const article_section = document.getElementById('article_section');
const article_list = document.getElementById('article_list');

fetchArticles();

function populateArticles(doc) {
	const data = doc.data();
	const article_title = data.title;
	const article_content = data.articleContent;
	const article_author = data.author;
	const publication_date = data.publicationDate;

	const article_item = document.createElement('li');
	const title = document.createElement('h4');
	const content = document.createElement('p');
	const author = document.createElement('strong');
	const publicationDate = document.createElement('i');

	title.textContent = article_title;
	content.textContent = article_content;
	author.textContent = article_author;
	publicationDate.textContent = publication_date;

	article_item.appendChild(title);
	article_item.appendChild(content);
	article_item.appendChild(author);
	article_item.appendChild(publicationDate);
	article_list.appendChild(article_item);

}

function fetchArticles() {
	firestore_db.collection('articles').get()
	.then(docs => {
		console.log(docs.size)
		docs.forEach(doc => {
			console.log(doc.data());
			populateArticles(doc)
		});
	})
	.catch(err => console.log(err.message))
}

