import { observer } from 'mobx-react-lite';
import styles from './FavsF.module.scss'
import SelectionHeader from '../../shared/components/Header/SelectionHeader/SelectionHeader';
import FavBookPreview from '../../shared/components/Previews/FavBookPreview/FavBookPreview';
import SelectionFooter from '../../shared/components/Footer/SelectionFooter/SelectionFooter';
import { MdShoppingCartCheckout } from 'react-icons/md';
import Banner from '../../shared/components/Banner/Banner';
import type { BookPreviewT } from '../../shared/types';
import { IoLibraryOutline, IoSparklesOutline } from 'react-icons/io5';

const favoriteBooks: BookPreviewT[] = [
    {
        Id: 'fav-1',
        Title: 'Мастер и Маргарита',
        Author: 'Михаил Булгаков',
        Genre: 'Драма',
        Rate: 4.9,
        ImageUrl: 'https://www.moscowbooks.ru/image/book/805/orig/i805305.jpg?cu=20240222135506',
        IsMine: true,
        Price: 800,
        Discount: 10
    },
    {
        Id: 'fav-2',
        Title: 'Пикник на обочине',
        Author: 'Аркадий и Борис Стругацкие',
        Genre: 'Фантастика',
        Rate: 4.8,
        ImageUrl: 'https://imo10.labirint.ru/books/868684/cover.jpg/242-0',
        IsMine: true,
        Price: 640,
        Discount: 5
    },
    {
        Id: 'fav-3',
        Title: 'Оно',
        Author: 'Стивен Кинг',
        Genre: 'Ужасы',
        Rate: 5,
        ImageUrl: 'https://imo10.labirint.ru/books/600284/cover.jpg/242-0',
        IsMine: true,
        Price: 990,
        Discount: 12
    },
    {
        Id: 'fav-4',
        Title: 'Шерлок Холмс',
        Author: 'Артур Конан Дойл',
        Genre: 'Приключения',
        Rate: 4.7,
        ImageUrl: 'https://imo10.labirint.ru/books/540709/cover.jpg/242-0',
        IsMine: true,
        Price: 700,
        Discount: 0
    },
    {
        Id: 'fav-5',
        Title: 'Зеленая Миля',
        Author: 'Стивен Кинг',
        Genre: 'Фантастика',
        Rate: 4.9,
        ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhhoSS4VwAoCA2l9iEe1ejrGckq7QZMp1Tw&s',
        IsMine: true,
        Price: 1100,
        Discount: 8
    },
    {
        Id: 'fav-6',
        Title: 'Преступление и наказание',
        Author: 'Федор Достоевский',
        Genre: 'Драма',
        Rate: 4.8,
        ImageUrl: 'https://cv6.litres.ru/pub/c/cover_415/4236675.webp',
        IsMine: true,
        Price: 720,
        Discount: 15
    }
];

const FavsF = observer(() => {
    return (
        <div className={styles.favs_page_style}>
            <SelectionHeader />
            <main className={styles.favs_main_container}>
                <section className={styles.favs_header}>
                    <div className={styles.favs_title_group}>
                        <div style={{display: 'flex', flexDirection: 'column', rowGap: 5}}>
                            <p className={styles.favs_title}>Мое <span className={styles.text_gradient}>Избранное</span></p>
                            <p className={styles.favs_subtitle}>Ваша персональная коллекция вдохновения</p>
                        </div>
                    </div>
                    <div className={styles.header_stats}>
                        <div className={styles.stat_item}>
                            <IoLibraryOutline />
                            <p>{favoriteBooks.length} книг</p>
                        </div>
                        <div className={styles.stat_item}>
                            <IoSparklesOutline />
                            <p>Подборка обновлена</p>
                        </div>
                    </div>
                </section>

                <section className={styles.favs_panel}>
                    <div className={styles.panel_header}>
                        <div>
                            <p className={styles.panel_title}>Сохраненные книги</p>
                        </div>
                        <button className={styles.panel_action}>В корзину все</button>
                    </div>

                    <div className={styles.favs_books_container}>
                        {favoriteBooks.map((book) => (
                            <FavBookPreview key={book.Id} book={book} />
                        ))}
                    </div>
                </section>

                <Banner
                    icon={MdShoppingCartCheckout}
                    color='#5269E0FF'
                    title='Готовы к новому путешествию?'
                    description='Не оставляйте любимых героев в одиночестве. Оформите подписку сегодня и получите дополнительный месяц бесплатно.'
                />
            </main>
            <SelectionFooter />
        </div>
    )
})

export default FavsF;
