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


const HistoryTable = () => {
    const rows = [
        {
            id: 1,
            title: 'Мастер и Маргарита',
            author: 'Михаил Булгаков',
            viewedAt: '24 апреля 2026',
            genre: 'Роман',
            rating: '4.9',
            volume: '512 стр.'
        },
        {
            id: 2,
            title: '1984',
            author: 'Джордж Оруэлл',
            viewedAt: '22 апреля 2026',
            genre: 'Антиутопия',
            rating: '4.8',
            volume: '328 стр.'
        },
        {
            id: 3,
            title: 'Дюна',
            author: 'Фрэнк Герберт',
            viewedAt: '19 апреля 2026',
            genre: 'Фантастика',
            rating: '4.7',
            volume: '688 стр.'
        },
        {
            id: 4,
            title: 'Дюна',
            author: 'Фрэнк Герберт',
            viewedAt: '19 апреля 2026',
            genre: 'Фантастика',
            rating: '4.7',
            volume: '688 стр.'
        },
        {
            id: 5,
            title: 'Дюна',
            author: 'Фрэнк Герберт',
            viewedAt: '19 апреля 2026',
            genre: 'Фантастика',
            rating: '4.7',
            volume: '688 стр.'
        },
        {
            id: 6,
            title: 'Дюна',
            author: 'Фрэнк Герберт',
            viewedAt: '19 апреля 2026',
            genre: 'Фантастика',
            rating: '4.7',
            volume: '688 стр.'
        },
        {
            id: 7,
            title: 'Дюна',
            author: 'Фрэнк Герберт',
            viewedAt: '19 апреля 2026',
            genre: 'Фантастика',
            rating: '4.7',
            volume: '688 стр.'
        },
        {
            id: 7,
            title: 'Дюна',
            author: 'Фрэнк Герберт',
            viewedAt: '19 апреля 2026',
            genre: 'Фантастика',
            rating: '4.7',
            volume: '688 стр.'
        },
        {
            id: 7,
            title: 'Дюна',
            author: 'Фрэнк Герберт',
            viewedAt: '19 апреля 2026',
            genre: 'Фантастика',
            rating: '4.7',
            volume: '688 стр.'
        },

    ];

    return (
        <div className={styles.history_table_wrapper}>
            <div className={styles.header_row}>
                <p className={styles.title}>Полный список книг</p>
                <div className={styles.border_vertical_style}></div>
                <p className={styles.count_badge}>ВСЕГО ЗАПИСЕЙ: 120</p>
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
                    overflowY: 'scroll',
                   
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                background: 'rgba(255, 255, 255, 0.025)',
                                '& .MuiTableCell-root': {
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
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
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
                                    {row.id}
                                </TableCell>
                                <TableCell sx={{ py: 2.2 }}>
                                    <div style={{display: 'flex', columnGap: 12}}>
                                        <img
                                            className={styles.preview_image}
                                            alt=""
                                            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPTPFv3U6ZVvZh0GYlNFWntSw0PJjFvqNwMA&s'}
                                        />
                                        <div className={styles.book_meta}>
                                            <p className={styles.book_title}>{row.title}</p>
                                            <span className={styles.book_author}>{row.author}</span>
                                        </div>
                                    </div>

                                </TableCell>
                                <TableCell sx={{ color: '#C8D0DD', fontSize: 14 }}>
                                    {row.viewedAt}
                                </TableCell>
                                <TableCell>
                                    <span className={styles.genre_badge}>{row.genre}</span>
                                </TableCell>
                                <TableCell sx={{ color: '#E9EDF5', fontSize: 14, fontWeight: 600 }}>
                                    {row.rating}
                                </TableCell>
                                <TableCell sx={{ color: '#C8D0DD', fontSize: 14 }}>
                                    {row.volume}
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
