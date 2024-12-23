class Person{
    constructor(name, id){
        this.name = name;
        this.id = id;
    }
    display(){
        console.log(`Name: ${this.name} \nID: ${this.id}`);
    }
}

class Member extends Person{
    constructor(name, id, membershipType){
        super(name, id);
        this.membershipType=membershipType;
    }
    display(){
        super.display();
        console.log(`Membership Type: ${this.membershipType}`)
    }
}

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author=author;
        this.isbn = isbn;
    }
    display(){
        console.log(`Title: ${this.title} \nAuthor: ${this.author} \nISBN: ${this.isbn}`);
    }
}

class Loan{
    constructor(member, book, dueDate){
        this.member = member;
        this.book=book;
        this.dueDate=dueDate;
    }
    display(){
        console.log(`${this.book} issued by ${this.member} is to be returned by ${this.dueDate}`)
    }
}

class Library{
    constructor(){
        this.books=[];
        this.members=[];
        this.loans=[];
    }
    addBook(book){
        this.books.push(book);
        console.log(`${book.title} added to library`);
    }
    registerMember(member){
        this.members.push(member);
        console.log(`${member.name} is registered`);
    }
    issueBook(isbn, memberId, dueDate){
        const book=this.books.find(b=>b.isbn===isbn);
        const member=this.members.find(m=>m.id===memberId);
        if(book && member){
            if(this.loans.find(loan=>loan.book.isbn===isbn)){
                console.log(`Book ${book} is already issued`);
            } else {
                const loan=new Loan(book, member, dueDate)
                this.loans.push(loan);
                console.log(`${book.title} issued to ${member.name} until ${loan.dueDate}`);
            }
        }
        else{
            console.log("Book or member not found");
        }
    }
}

const library=new Library();
const book1=new Book("1984", "George Orwell", "1234567890");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "0987654321");
library.addBook(book1); 
library.addBook(book2);
const member1 = new Member("Ashutosh", "M001", "Gold"); 
const member2 = new Member("Yusuf", "M002", "Silver");
library.registerMember(member1); 
library.registerMember(member2);
library.issueBook("1234567890", "M001", "2024-12-30"); 
library.issueBook("0987654321", "M002", "2024-12-30");
library.issueBook("0987654321", "M003", "2024-12-30");