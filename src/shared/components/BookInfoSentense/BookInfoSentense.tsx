import type { FC } from "react";
import type { IconType } from "react-icons";
import styles from './BookInfoSentense.module.scss';

export type BookInfoSentenseProps = {
    icon: IconType,
    title: string,
    text: string
}


const BookInfoSentense: FC<BookInfoSentenseProps> = ({ icon: Icon, title, text }) => {
    return (
        <div className={styles.sentense_card}>
            <div className={styles.sentense_icon}>
                <Icon />
            </div>

            <div className={styles.sentense_text}>
                <p className={styles.sentense_title}>{title}</p>
                <p className={styles.sentense_description}>{text}</p>
            </div>

        </div>
    )
}


export default BookInfoSentense;
