function firstTask() {
    let fruits = ['banana', 'apple', 'orange'];
    console.log(fruits + "\n\n\n\n");
    fruits.pop();
    console.log(fruits);
    fruits.push('pineapple')
    fruits.sort().reverse();
    console.log(fruits + "\n\n\n\n");
    console.log(fruits.findIndex(function (item) {
        return item === 'apple';
    }));
}

function secondTask() {
    let colours = ['black', 'red', 'magenta','lightblue'];
    colours.sort((a, b) => a.length - b.length);

    colours = colours.filter(item => !item.includes('blue'));
    console.log(colours)
    console.log(colours[0] + " ----- " + colours[colours.length - 1]);

    console.log(colours.slice().join(","));
}

function thirdTask() {
    let employees = [
        {
            name: 'Igor',
            age: 25,
            post: 'Inspector'
        },
        {
            name: 'Vasyl',
            age: 22,
            post: 'DevOps'
        },
        {
            name: 'Ivan',
            age: 32,
            post: 'Developer'
        },
    ]

    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.table(employees);

    employees.filter(employee => employee.post === 'Developer');

    employees = employees.filter(employee => employee.age < 30);

    employees.push({
        name: 'Dima',
        age: 21,
        post: 'Soldier'
    })

    console.table(employees)
}

function fourthTask() {
    let students = [
        {
            name: 'Dima',
            age: 20,
            year: 3
        },
        {
            name: 'Dana',
            age: 20,
            year: 3
        },
        {

            name: 'Olexiy',
            age: 17,
            year: 1
        }
    ]

    students = students.filter(student => student.name !== 'Olexiy')

    students.push({
        name: 'Lily',
        age: 21,
        year: 4
    })

    students.sort((a, b) => b.age - a.age);

    students.find(student => student.year === 3)
}

function fifthTask() {
    let numbers = [1, 2, 3, 4, 5, 6];
    numbers.map(number => number * number);
    numbers = numbers.filter(number => number % 2 === 0);

    console.log(numbers.reduce((a, b) => a + b, 0));

    let secondNumbers = [1, 2, 3, 4, 5]

    numbers = numbers.concat(secondNumbers);
    numbers.splice(numbers.length/2);
    console.log(numbers)

}

function libraryManagement() {
    let books = [
        {
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J.K. Rowling",
            genre: "fantasy",
            pages: 320,
            isAvailable: true
        },
        {
            title: "Harry Potter and the Chamber of Secrets",
            author: "J.K. Rowling",
            genre: "fantasy",
            pages: 251,
            isAvailable: true
        },
        {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            genre: "fantasy",
            pages: 1178,
            isAvailable: true}, 
        {title: "To Kill a Mockingbird", author: "Harper Lee", genre: "fiction", pages: 281, isAvailable: true},
        {title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "fiction", pages: 180, isAvailable: true},
        {title: "1984", author: "George Orwell", genre: "dystopian fiction", pages: 328, isAvailable: true},
        {title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "fiction", pages: 277, isAvailable: true},
        {
            title: "Pride and Prejudice",
            author: "Jane Austen",
            genre: "classic literature",
            pages: 279,
            isAvailable: true
        }
    ];

    function addBook(title, author, genre, pages, isAvailable = true) {
        const newBook = {title: title, author: author, genre: genre, pages, isAvailable: isAvailable};
        books.push(newBook)
        return newBook;
    }

    function removeBook(title) {
        books = books.filter(book => book.title !== title);
        return console.log(books);
    }

    function findBooksByAuthor(author) {
        let booksByAuthor = books.filter(book => book.author === author);
        return booksByAuthor;
    }

    function toggleBookAvailability(title, isBorrowed) {
        const book = books.find((book) => book.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
        }
    }

    function sortBooksByPages(arr) {
        arr.sort((a, b) => a.pages - b.pages);
    }

    function getBooksStatistics() {
        let countBooks = books.length;

        let availableBooks = books.filter(book => book.isAvailable === true);
        let countAvailableBooks = availableBooks.length + 1;

        let countBorrowedBooks = countBooks - countAvailableBooks;

        let sumAllPages = books.reduce((sum, current) => sum + current.pages, 0);
        let averagePages = sumAllPages / countBooks;

        return "Загальна кількість книг: " + countBooks + ", кількість доступних книг: " +
            countAvailableBooks + ", кількість взятих книг: " + countBorrowedBooks +
            ", середня кількість сторінок у книзі: " + averagePages + ".";
    }
    return {
        addBook,
        removeBook,
        findBooksByAuthor,
        toggleBookAvailability,
        sortBooksByPages,
        getBooksStatistics,
        books
    };
}

function seventhTask() {
    let student = {
        name: 'Lily',
        age: 21,
        year: 4
    }
    student.subjects = ['OOP', 'WebKa']
    delete student.age;
    console.table(student);
}

console.log("Завдання 1");
firstTask();
console.log("Завдання 2");
secondTask();
console.log("Завдання 3");
thirdTask();
console.log("Завдання 4");
fourthTask();
console.log("Завдання 5");
fifthTask();
console.log("Завдання 7");
seventhTask();


console.log("Завдання 6");
const library = libraryManagement();

//add book
let newBook = library.addBook("The Hobbit", "J.R.R. Tolkien", "fantasy", 310);
console.log("Added book: " + newBook.title);
console.log(library.books);

//remove book
let titleToDelete = "The Great Gatsby";
console.log("Removed book: "+ titleToDelete);
library.removeBook(titleToDelete);

//find by author
let author = "J.K. Rowling";
console.log("Books by author: " + author);
console.log(library.findBooksByAuthor(author));

//Borrowed books
console.log("Borrowed books:")
library.toggleBookAvailability("Pride and Prejudice", true);
library.toggleBookAvailability("The Hobbit", true);
library.toggleBookAvailability("1984", true);

console.table(library.books);

//sort
console.log("Sorted books: ")
library.sortBooksByPages(library.books);
console.table(library.books);

//statistic
console.log("Statistics:")
console.log(library.getBooksStatistics());