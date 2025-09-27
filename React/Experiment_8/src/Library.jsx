import React, { useState } from "react";

const initialBooks = [
  { title: "The Alchemist", author: "Paulo Coelho" },
  { title: "Atomic Habits", author: "James Clear" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "1984", author: "George Orwell" },
  { title: "Pride and Prejudice", author: "Jane Austen" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "Wings of Fire", author: "A.P.J. Abdul Kalam" },
  { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari" }
];

const Library = () => {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (newTitle.trim() && newAuthor.trim()) {
      setBooks([
        ...books,
        { title: newTitle.trim(), author: newAuthor.trim() }
      ]);
      setNewTitle("");
      setNewAuthor("");
    }
  };

  const handleRemoveBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="library-title">Library Management</div>
      <input
        className="search-bar"
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by title or author..."
      />

      <form className="add-book-form" onSubmit={handleAddBook}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Book title"
          required
        />
        <input
          type="text"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul className="book-list">
        {filteredBooks.map((book, i) => (
          <li key={i} className="book-item">
            <div className="book-details">
              <strong>{book.title}</strong> by {book.author}
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemoveBook(i)}
            >
              Remove
            </button>
          </li>
        ))}
        {filteredBooks.length === 0 && (
          <li>No books found.</li>
        )}
      </ul>
    </div>
  );
};

export default Library;
