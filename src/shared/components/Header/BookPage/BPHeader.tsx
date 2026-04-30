import { useNavigate } from "react-router-dom";
import styles from './BPHeader.module.scss'
import { IoBookOutline, IoChevronBack } from "react-icons/io5";
import type { FC } from "react";
import type { Genres } from "../../../types";
import { ColorChoiceFunc } from "../../../helpers/colorChoice";
import NavComponent from "../../Navigation/NavComponent";




export const BPHeader: FC<{ title: string, author: string, genre: Genres }> = ({ title, author, genre }) => {
    const navigate = useNavigate();

    return (

        <div className={styles.book_page_header}>
            <div className={styles.book_page_header_inner}>
                <div className={styles.header_first_block}>
                    <button className={styles.back_button} onClick={() => navigate(-1)}>
                        <IoChevronBack />
                    </button>

                    <div className={styles.book_icon} style={{ background: ColorChoiceFunc(genre) }}>
                        <IoBookOutline />
                    </div>

                    <div className={styles.title_block}>
                        <p className={styles.book_title}>{title || 'Значения потеряны'}</p>
                        <p className={styles.book_author}>{author}</p>
                    </div>
                </div>
                <NavComponent myBooksPage={false} />
            </div>

        </div>



    )


}
export default BPHeader;
