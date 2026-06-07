import type { FC } from 'react';
import styles from './HistoryRecentRows.module.scss'
import type { ReadingBookPreview } from '../../types';

import HistoryRecentPreview from '../Previews/HistoryRecentPreview/HistoryRecentPreview';

const HistoryRecentRows: FC<{ books: ReadingBookPreview[] }> = ({ books }) => {
    if (!books.length) {
        return (
            <div className={styles.history_row_wrapper}>
                <p style={{ color: '#8F98A8', fontSize: 15 }}>Недавних чтений пока нет</p>
            </div>
        );
    }

    return (
        <div className={styles.history_row_wrapper}>
            {books.map((book) => (
                <HistoryRecentPreview key={book.Id} book={book} />
            ))}
        </div>
    )
}

export default HistoryRecentRows;
