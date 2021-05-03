class Book {
  constructor(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    //    this.color = randomBookColor();
    if (haveRead == true) {
      this.haveRead = "Read";
    }
    if (haveRead == false) {
      this.haveRead = "Not read yet";
    }
  }
  info() {
    return `${this.title} by ${this.author}, ${pages} pages, ${this.haveRead}.`;
  }
  toggleHasRead(hasRead) {
    this.haveRead === "Read"
      ? (this.haveRead = "Not yet read")
      : (this.haveRead = "Read");
    displayLibrary();
  }
}

let myLibrary = [];

displayLibrary();
checkForBooks();
document
  .getElementById("openButton")
  .addEventListener("click", () => openForm());

function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("submit").addEventListener("click", submitInfo);
}

function submitInfo() {
  let author = document.querySelector("#author").value;
  let title = document.querySelector("#title").value;
  let pages = document.querySelector("#pages").value;
  let haveRead = document.querySelector("#haveRead").checked;
  addBookToLibrary(author, title, pages, haveRead);
}

function addBookToLibrary(author, title, pages, haveRead) {
  myLibrary.push(new Book(author, title, pages, haveRead));
  checkForBooks();
  displayLibrary();
  closeForm();
}

function displayLibrary() {
  document.getElementById("library").textContent = "";
  if (myLibrary.length === 0) {
    checkForBooks();
    return;
  }
  for (i = 0; i < myLibrary.length; i++) {
    let newBook = document.createElement("div");
    let thisBook = "Book" + i;
    setBookAttributes(newBook, thisBook);

    document.getElementById("library").appendChild(newBook);
    for (const property in myLibrary[i]) {
      document
        .getElementById(thisBook)
        .appendChild(createBookElement(myLibrary[i][property]));
    }
    addDeleteButton(thisBook);
    addReadButton(thisBook);
  }
}

function setBookAttributes(newBook, thisBook) {
  newBook.setAttribute("id", thisBook);
  newBook.setAttribute("class", "book");
  newBook.style.backgroundColor = randomBookColor();
}

function addDeleteButton(thisBook) {
  let deleteButton = document.createElement("div");
  document.getElementById(thisBook).appendChild(deleteButton);
  deleteButton.setAttribute("class", "deleteButton");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", () => removeBookFromLibrary(thisBook));
}

function removeBookFromLibrary(thisBook) {
  let input = confirm("Are you sure you want to delete this book?");
  if (input === false) return;
  let index = thisBook.substring(4);
  myLibrary.splice(index, 1);
  displayLibrary();
}

function addReadButton(thisBook) {
  let readButton = document.createElement("div");
  document.getElementById(thisBook).appendChild(readButton);
  let index = thisBook.substring(4);
  readButton.textContent = "Read?";
  readButton.addEventListener("click", () =>
    myLibrary[index].toggleHasRead(readButton)
  );
}

function createBookElement(item) {
  let p = document.createElement("p");
  p.textContent = item;
  return p;
}

function checkForBooks() {
  if (myLibrary == "") {
    document.getElementById("library").textContent =
      "You don't have any books in your library!";
    return;
  }
  document.getElementById("library").textContent = "";
  return;
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function randomBookColor() {
  let color = ["red", "blue", "green", "purple", "gray", "brown"];
  return color[Math.floor(Math.random() * color.length)];
}
