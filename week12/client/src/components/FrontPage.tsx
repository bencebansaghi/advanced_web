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
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="pages">Pages:</label>
            <input
              type="number"
              id="pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default FrontPage