document.getElementById("searchform").addEventListener("submit", fetchBook);
async function fetchBook(event) {
    event.preventDefault();
    const query= document.getElementById("book").value;
    const apiKey="AIzaSyAz4f8ccZeNiYmzEdXPaL0QZU5OvEk0BcI";
    const url=`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
    try {
        const response = await fetch(url);
        if(!response.ok)
            throw new Error("http error");   
        const data= await response.json();
        displayBooks(data.items);
    } catch (error) {
        alert (error.message);
        
    }
}

function displayBooks(books) {
    const bookDisplay = document.getElementById('displayresults');
    bookDisplay.innerHTML = '';
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML =`
            <img src="${book.volumeInfo.imageLinks?.thumbnail}" alt="Couverture du livre">
            <p class="title">${book.volumeInfo.title}</p>
            <p class="author">${book.volumeInfo.authors?.join(', ')}</p>
            <p class="description">${book.volumeInfo.description || 'Description non disponible.'}</p>`
        ;
        bookDisplay.appendChild(bookDiv);
    });
}