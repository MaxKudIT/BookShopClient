import { observer } from "mobx-react-lite";
import { useMemo, useState, type FormEvent } from "react";
import { MdAdd, MdLibraryBooks, MdOutlineAutoStories, MdOutlineChecklist, MdOutlineImage } from "react-icons/md";
import SelectionHeader from "../../shared/components/Header/SelectionHeader/SelectionHeader";
import SelectionFooter from "../../shared/components/Footer/SelectionFooter/SelectionFooter";
import { useStores } from "../../store/context/GloabalContext";
import type { AdminBookCreate, Genres } from "../../shared/types";
import styles from "./AdminF.module.scss";

const genres: Genres[] = ['Приключения', 'Ужасы', 'Драма', 'Исторические', 'Фантастика'];
const pageDivider = '---PAGE---';

type AdminForm = {
    title: string;
    author: string;
    genre: Genres;
    price: string;
    discount: string;
    imageUrl: string;
    readingTime: string;
    description: string;
    aboutBook: string;
    quote: string;
    pagesText: string;
};

const initialForm: AdminForm = {
    title: '',
    author: '',
    genre: 'Фантастика' as Genres,
    price: '0',
    discount: '0',
    imageUrl: '',
    readingTime: '',
    description: '',
    aboutBook: '',
    quote: '',
    pagesText: '',
};

const AdminF = observer(() => {
    const {
        adminStore: {
            createBook,
            createBookState,
            createdBook,
            clearCreatedBook,
        },
    } = useStores();

    const [form, setForm] = useState(initialForm);
    const [validationError, setValidationError] = useState<string | null>(null);

    const pages = useMemo(() => {
        return form.pagesText
            .split(pageDivider)
            .map((page) => page.trim())
            .filter(Boolean);
    }, [form.pagesText]);

    const setField = <K extends keyof AdminForm>(name: K, value: AdminForm[K]) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        setValidationError(null);
        if (createdBook) {
            clearCreatedBook();
        }
    };

    const buildPayload = (): AdminBookCreate | null => {
        const price = Number(form.price);
        const discount = Number(form.discount);

        if (!form.title.trim() || !form.author.trim()) {
            setValidationError('Укажите название и автора книги');
            return null;
        }

        if (!Number.isFinite(price) || price < 0) {
            setValidationError('Цена должна быть положительным числом');
            return null;
        }

        if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
            setValidationError('Скидка должна быть от 0 до 100');
            return null;
        }

        if (!form.description.trim() || !form.aboutBook.trim()) {
            setValidationError('Добавьте описание и блок "О книге"');
            return null;
        }

        if (pages.length === 0) {
            setValidationError(`Добавьте хотя бы одну страницу. Разделитель страниц: ${pageDivider}`);
            return null;
        }

        return {
            title: form.title.trim(),
            author: form.author.trim(),
            genre: form.genre,
            price,
            discount,
            imageUrl: form.imageUrl.trim(),
            description: form.description.trim(),
            aboutBook: form.aboutBook.trim(),
            quote: form.quote.trim(),
            readingTime: form.readingTime.trim(),
            pages,
        };
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = buildPayload();
        if (!payload || createBookState.loading) {
            return;
        }

        const result = await createBook(payload);
        if (result) {
            setForm(initialForm);
        }
    };

    return (
        <div className={styles.admin_page}>
            <SelectionHeader />
            <main className={styles.admin_main}>
                <section className={styles.hero}>
                    <div>
                        <p className={styles.eyebrow}>Админ-панель</p>
                        <h1>Добавление книги</h1>
                        <p className={styles.subtitle}>
                            Создание электронной книги вместе со страницами для онлайн-чтения.
                        </p>
                    </div>

                    <div className={styles.summary}>
                        <div className={styles.summary_item}>
                            <MdLibraryBooks />
                            <span>{form.title.trim() || 'Новая книга'}</span>
                        </div>
                        <div className={styles.summary_item}>
                            <MdOutlineAutoStories />
                            <span>{pages.length} стр.</span>
                        </div>
                    </div>
                </section>

                <form className={styles.form_grid} onSubmit={handleSubmit}>
                    <section className={styles.panel}>
                        <div className={styles.panel_header}>
                            <MdOutlineChecklist />
                            <div>
                                <h2>Основные данные</h2>
                                <p>Информация, которая попадет в карточку книги.</p>
                            </div>
                        </div>

                        <div className={styles.fields_grid}>
                            <label className={styles.field}>
                                <span>Название</span>
                                <input value={form.title} onChange={(event) => setField('title', event.target.value)} />
                            </label>

                            <label className={styles.field}>
                                <span>Автор</span>
                                <input value={form.author} onChange={(event) => setField('author', event.target.value)} />
                            </label>

                            <label className={styles.field}>
                                <span>Жанр</span>
                                <select value={form.genre} onChange={(event) => setField('genre', event.target.value as Genres)}>
                                    {genres.map((genre) => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </label>

                            <label className={styles.field}>
                                <span>Время чтения</span>
                                <input value={form.readingTime} placeholder="Например: 6" onChange={(event) => setField('readingTime', event.target.value)} />
                            </label>

                            <label className={styles.field}>
                                <span>Цена</span>
                                <input type="number" min="0" value={form.price} onChange={(event) => setField('price', event.target.value)} />
                            </label>

                            <label className={styles.field}>
                                <span>Скидка, %</span>
                                <input type="number" min="0" max="100" value={form.discount} onChange={(event) => setField('discount', event.target.value)} />
                            </label>
                        </div>
                    </section>

                    <section className={styles.panel}>
                        <div className={styles.panel_header}>
                            <MdOutlineImage />
                            <div>
                                <h2>Описание</h2>
                                <p>Обложка, описание и дополнительные данные книги.</p>
                            </div>
                        </div>

                        <label className={styles.field}>
                            <span>URL обложки</span>
                            <input value={form.imageUrl} onChange={(event) => setField('imageUrl', event.target.value)} />
                        </label>

                        <label className={styles.field}>
                            <span>Краткое описание</span>
                            <textarea value={form.description} onChange={(event) => setField('description', event.target.value)} />
                        </label>

                        <label className={styles.field}>
                            <span>О книге</span>
                            <textarea value={form.aboutBook} onChange={(event) => setField('aboutBook', event.target.value)} />
                        </label>

                        <label className={styles.field}>
                            <span>Цитата</span>
                            <textarea value={form.quote} onChange={(event) => setField('quote', event.target.value)} />
                        </label>
                    </section>

                    <section className={`${styles.panel} ${styles.pages_panel}`}>
                        <div className={styles.panel_header}>
                            <MdOutlineAutoStories />
                            <div>
                                <h2>Страницы книги</h2>
                                <p>Разделяйте страницы строкой {pageDivider}.</p>
                            </div>
                        </div>

                        <label className={styles.field}>
                            <span>Текст страниц</span>
                            <textarea
                                className={styles.pages_textarea}
                                value={form.pagesText}
                                placeholder={`Текст первой страницы\n\n${pageDivider}\n\nТекст второй страницы`}
                                onChange={(event) => setField('pagesText', event.target.value)}
                            />
                        </label>
                    </section>

                    <aside className={styles.action_panel}>
                        <h2>Публикация</h2>
                        <p>После сохранения книга и страницы будут отправлены на backend.</p>

                        <div className={styles.stats_row}>
                            <span>Страниц</span>
                            <strong>{pages.length}</strong>
                        </div>

                        <div className={styles.stats_row}>
                            <span>Жанр</span>
                            <strong>{form.genre}</strong>
                        </div>

                        {(validationError || createBookState.error) && (
                            <div className={styles.error_box}>
                                {validationError || createBookState.error}
                            </div>
                        )}

                        {createdBook && (
                            <div className={styles.success_box}>
                                Книга создана. ID: {createdBook.bookId}
                            </div>
                        )}

                        <button className={styles.submit_button} type="submit" disabled={createBookState.loading}>
                            <MdAdd />
                            {createBookState.loading ? 'Сохраняем...' : 'Добавить книгу'}
                        </button>
                    </aside>
                </form>
            </main>
            <SelectionFooter />
        </div>
    );
});

export default AdminF;
