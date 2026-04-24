import { useState, type FC } from 'react';
import type { BookPreviewT } from '../../types';

const BookCarousel: FC<{books: BookPreviewT[]}> = ({ books }) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;  // показываем 5 книг
  const step = 3;          // сдвигаем на 3 позиции

  const visibleBooks = books.slice(startIndex, startIndex + visibleCount);
  const maxStartIndex = Math.max(0, books.length - visibleCount);

  const next = () => {
    setStartIndex(prev => Math.min(prev + step, maxStartIndex));
  };

  const prev = () => {
    setStartIndex(prev => Math.max(prev - step, 0));
  };

  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex + visibleCount >= books.length;

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: '20px', overflow: 'hidden' }}>
        {visibleBooks.map(book => (
          <div key={book.id} style={{ flex: '0 0 auto', width: '200px' }}>
            <img src={book.cover} alt={book.title} />
          </div>
        ))}
      </div>

      <button onClick={prev} disabled={isPrevDisabled}>
        ←
      </button>
      <button onClick={next} disabled={isNextDisabled}>
        →
      </button>
    </div>
  );
};