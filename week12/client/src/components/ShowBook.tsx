import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface IBook extends Document {
    name: string
    author: string
    pages: number
}

function ShowBook() {
  const { name } = useParams<{ name?: string }>();
  const [book, setBook] = useState<IBook>();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/book/${name}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data);
        } else {
          console.error('Book not found');
        }
      } catch (error) {
        console.error('There was an error fetching the book!', error);
      }
    };

    if (name) {
      fetchBook();
    }
  }, [name]);

  if (!book) {
    return <div>
        <h1>404: This is not the webpage you are looking for</h1>
    </div>;
  }

  return (
    <>
    <div>
      <p>{book.name}</p>
      <p>Author: {book.author}</p>
      <p>Pages: {book.pages}</p>
    </div>
    </>
  );
}

export default ShowBook;
