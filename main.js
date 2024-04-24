const myLibrary = [];

function Book(name, author, page, read) {
    this.name = name;
    this.author = author;
    this.page = page;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log("Book added to library:", book.name);
}

function openForm() {
    Form.style.display = "block";
    overlay.style.display = "block";
}

function validateForm(title, author, pages) {
    if (title == "" || author == "" || pages == "") {
        formerror.style.display = "block";
        Form.style.display = "none";

        return false;
    }
    return true;
}

function addbookSubmit() {
    var title = document.getElementById("bookTitle").value;
    var author = document.getElementById("bookAuthor").value;
    var pages = document.getElementById("pages").value;
    var read = document.getElementById("read").checked;

    const valid = validateForm(title, author, pages);
    if (valid) {
        var newBook = new Book(title, author, pages, read);
        addBookToLibrary(newBook);
        updateTable();
        Form.style.display = "none";
        overlay.style.display = "none";
    }
}

function updateTable() {
    var tableBody = document.querySelector("#book-table-container tbody");
    tableBody.innerHTML = "";

    myLibrary.forEach(function (book, index) {
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.page}</td>
            <td>${book.read ? "Yes" : "No"}</td>
            <td><button class="remove-book" data-index="${index}">Remove</button></td>
        `;
        tableBody.appendChild(newRow);
    });

    var removeButtons = document.querySelectorAll(".remove-book");
    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var index = parseInt(button.getAttribute("data-index"));
            removeBookFromLibrary(index);
            updateTable();
        });
    });
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

var addbookButton = document.getElementById("add-book");
var Form = document.getElementById("bookFormContainer");
var overlay = document.getElementById("overlay");
var cancelBtn = document.getElementById("cancelBtn");
var submitBtn = document.getElementById("submitBtn");
var formerror = document.getElementById("form-error");
var okayBtn = document.getElementById("okay")

addbookButton.addEventListener("click", openForm);
submitBtn.addEventListener("click", addbookSubmit);

okayBtn.addEventListener("click", function () {
    formerror.style.display = "none";
    Form.style.display = "block";
});

cancelBtn.addEventListener("click", function () {
    Form.style.display = "none";
    overlay.style.display = "none";
});
