import styles from './HistoryTable.module.scss'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import type { BookViewPreview } from '../../types';


const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
};

const HistoryTable = ({ books }: { books: BookViewPreview[] }) => {

    return (
        <div className={styles.history_table_wrapper}>
            <div className={styles.header_row}>
                <p className={styles.title}>Полный список книг</p>
                <div className={styles.border_vertical_style}></div>
                <p className={styles.count_badge}>ВСЕГО ЗАПИСЕЙ: {books.length}</p>
            </div>

            <TableContainer
                component={Paper}
                elevation={0}
                className={styles.table_shell}
                sx={{
                    background: 'linear-gradient(180deg, rgba(28, 33, 44, 0.96), rgba(21, 26, 35, 0.98))',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '22px',
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }}
            >
                <Table stickyHeader aria-label="История чтения">
                    <TableHead>
                        <TableRow
                            sx={{
                                '& .MuiTableCell-root': {
                                    background: 'rgba(24, 29, 38, 0.98)',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                                }
                            }}
                        >
                            {['№', 'Название и автор', 'Дата просмотра', 'Жанр', 'Рейтинг', 'Объем'].map((item) => (
                                <TableCell
                                    key={item}
                                    sx={{
                                        color: '#8F98A8',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        py: 2.2,
                                    }}
                                >
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {books.map((book, index) => (
                            <TableRow
                                key={`${book.Id}-${index}`}
                                hover
                                sx={{
                                    transition: 'background 0.18s ease',
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.03)'
                                    },
                                    '& .MuiTableCell-root': {
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                    },
                                    '&:last-child .MuiTableCell-root': {
                                        borderBottom: 'none'
                                    }
                                }}
                            >
                                <TableCell sx={{ color: '#F4F7FB', fontSize: 14, fontWeight: 600 }}>
                                    {index + 1}
                                </TableCell>
                                <TableCell sx={{ py: 2.2 }}>
                                    <div className={styles.book_cell}>
                                        <img
                                            className={styles.preview_image}
                                            alt={book.Title}
                                            src={book.ImageUrl}
                                        />
                                        <div className={styles.book_meta}>
                                            <p className={styles.book_title}>{book.Title}</p>
                                            <span className={styles.book_author}>{book.Author}</span>
                                        </div>
                                    </div>

                                </TableCell>
                                <TableCell sx={{ color: '#C8D0DD', fontSize: 14 }}>
                                    {formatDate(book.ViewedAt)}
                                </TableCell>
                                <TableCell>
                                    <span className={styles.genre_badge}>{book.Genre}</span>
                                </TableCell>
                                <TableCell sx={{ color: '#E9EDF5', fontSize: 14, fontWeight: 600 }}>
                                    {book.Rate}
                                </TableCell>
                                <TableCell sx={{ color: '#C8D0DD', fontSize: 14 }}>
                                    {book.PagesCount} стр.
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default HistoryTable;
