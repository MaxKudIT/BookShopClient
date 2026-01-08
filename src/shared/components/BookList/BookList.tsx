import type { FC } from 'react';
import styles from './BookList.module.scss'
import type { BookPreviewT, Genres } from '../../types';
import React, { useMemo } from 'react';
import { searchByPartial } from '../../helpers/searchByPartial';
import { useMyBooksSearch, useSearch } from '../../../store/context/SearchContext';
import BookPreview from '../BookPreview/BookPreview';



export const BookList: FC<{ list: BookPreviewT[], viewPage: 'home' | 'shop' }> = ({ list, viewPage: pageView }) => {


    const { searchingValue, selectedGenre } = useMyBooksSearch()
    const { searchingValue: sv, selectedGenre: sg } = useSearch();

    function filterBySearch(books: BookPreviewT[], searchValue: string): BookPreviewT[] {
        return books.filter(({ Title }: BookPreviewT) => searchByPartial(searchValue, Title));
    }

    function filterByCategory(books: BookPreviewT[], genreSelected: Genres): BookPreviewT[] {
        return books.filter(({ Genre }: BookPreviewT) => Genre === genreSelected);
    }


    const filteredBooks = useMemo(() => {
        const getActiveFilters = () => {
            switch (pageView) {
                case 'home':
                    return { search: searchingValue, genre: selectedGenre };
                case 'shop':
                    return { search: sv, genre: sg }
            }
        };

        const { search, genre } = getActiveFilters();
        let result = [...list];

        if (search) {
            result = filterBySearch(result, search);
        }

        if (genre !== 'Все жанры') {
            result = filterByCategory(result, genre);
        }

        return result;

    }, [list, pageView, searchingValue, selectedGenre, sv, sg]);



    const countFoundBooks = filteredBooks.length;



    return (
        <>
            <div className={styles.title_row}>
                Найдено книг: {countFoundBooks}
            </div>
            <div className={styles.book_list_container}>
                {
                    filteredBooks.map(book => (
                        <BookPreview
                            PageView={pageView}
                            Price={book.Price}
                            IsMine={book.IsMine}
                            key={book.Id}
                            Id={book.Id}
                            Genre={book.Genre}
                            Title={book.Title}
                            ImageUrl={book.ImageUrl}
                            Discount={book.Discount}
                        />
                    ))
                }
            </div>
        </>

    )
}


export default React.memo(BookList);