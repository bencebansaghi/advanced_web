import { useState } from 'react'
import React from 'react'

function FrontPage() {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [pages, setPages] = useState('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, author, pages }),
        });
        if (response.ok) {
          alert('Book added successfully');
        } else {
          console.error('There was an error adding the book!');
        }
      } catch (error) {
        console.error('There was an error adding the book!', error);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Book Name:</label>
            <input
              type="text" // input name string
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              type="text" // input author string
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="pages">Pages:</label>
            <input
              type="number" // input pages number
              id="pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              required
            />
          </div>
          <button id="submit" type="submit">Submit</button> // input submit submit
        </form>
      </div>
    );
}

export default FrontPage