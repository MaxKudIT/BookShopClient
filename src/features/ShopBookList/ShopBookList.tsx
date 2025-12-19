import React, { useMemo } from "react";
import styles from './ShopBookList.module.scss'
import type { BookPreviewT, Genres } from "../../shared/types";
import BookPreview from "../../shared/components/BookPreview/BookPreview";
import { searchByPartial } from "../../shared/helpers/searchByPartial";
import { useSearch } from "../../store/context/SearchContext";



const ShopBookList = () => {

  const { searchingValue, selectedGenre } = useSearch()

  const books: BookPreviewT[] = [
    {
      id: '1',
      title: 'Остров сокровищ',
      image: 'https://avatars.mds.yandex.net/i?id=fabf4f0cae4cfa4ccd4cfa87485183dd_l-16509560-images-thumbs&n=13',
      genre: 'Приключения',
      price: 699,
      isAvailable: true
    },
    {
      id: '2',
      title: 'Робинзон Крузо',
      image: 'https://i.pinimg.com/736x/0f/47/29/0f4729135ff7de9ef87f6d603c3c408b.jpg',
      genre: 'Приключения',
      price: 499,
      isAvailable: false
    },
    {
      id: '3',
      title: 'Сердце пармы',
      image: 'https://avatars.mds.yandex.net/get-mpic/5189780/2a00000193e3523c621eac68f04adc636ddb/orig',
      genre: 'Исторические',
      price: 0,
      isAvailable: false
    },
    {
      id: '4',
      title: 'Оно',
      image: 'https://avatars.mds.yandex.net/get-mpic/3980374/2a00000192064ba21f53d7ec034b6a20677f/orig',
      genre: 'Ужасы',
      price: 1299,
      isAvailable: true
    },
    {
      id: '5',
      title: 'Исторические драмы',
      image: 'https://avatars.mds.yandex.net/get-marketpic/196254/picefcf81316b763403498926747a41346b/orig',
      genre: 'Драма',
      price: 399,
      isAvailable: false
    },
    {
      id: '6',
      title: 'Человек-паук',
      image: 'https://cdn1.ozone.ru/s3/multimedia-3/c600/6799258983.jpg',
      genre: 'Фантастика',
      price: 1599,
      isAvailable: false
    }
  ]


  function filterBySearch(books: BookPreviewT[], searchValue: string): BookPreviewT[] {
    if (!searchValue) return books;
    return books.filter(({ title }: BookPreviewT) => searchByPartial(searchValue, title));
  }

  function filterByCategory(books: BookPreviewT[], genreSelected: Genres | 'Все жанры'): BookPreviewT[] {
    if (genreSelected === 'Все жанры') {
      return books
    }
    return books.filter(({ genre }: BookPreviewT) => genre === genreSelected);
  }


  const filteredBooks = useMemo(() => {
    let result = books;

    if (searchingValue) {
      result = filterBySearch(books, searchingValue)
    }


    if (selectedGenre !== 'Все жанры') {
      result = filterByCategory(result, selectedGenre)
    }

    return result;
  }, [books, searchingValue, selectedGenre]);


  const countFoundBooks = filteredBooks.length;

  return (
    <div className={styles.books_global_style}>
      <div className={styles.title_row}>
        Найдено книг: {countFoundBooks}
      </div>

      <div className={styles.book_list_container}>
        {selectedGenre === 'Все жанры'
          ? filteredBooks.map(book => (
            <BookPreview
              price={book.price}
              isAvailable={book.isAvailable}
              key={book.id}
              id={book.id}
              genre={book.genre}
              title={book.title}
              image={book.image}
            />
          ))
          : filteredBooks.map(book => (
            <BookPreview
              price={book.price}
              isAvailable={book.isAvailable}
              key={book.id}
              id={book.id}
              genre={book.genre}
              title={book.title}
              image={book.image}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ShopBookList;