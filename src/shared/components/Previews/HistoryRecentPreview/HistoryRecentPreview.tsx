import type { FC } from 'react';
import styles from './HistoryRecentPreview.module.scss'
import { FaRegStar } from "react-icons/fa";
import type { BookPreviewT } from '../../../types';
import { MdOutlineDateRange } from 'react-icons/md';
import { LuBookOpenText } from 'react-icons/lu';

const HistoryRecentPreview: FC<{ book: BookPreviewT }> = ({ book }) => {

    return (
        <div className={styles.item_view_compo_wrapper}>
            <div className={styles.preview_content}>
                {/* <Checkbox
                        checked={isSelected}
                        onChange={(e) => {
                            if (e.target.checked) {
                                addItem({id: Id, price: Math.floor(Price - (Price / 100 * Discount))})
                            } else {
                                deleteItem(Id)
                            }
                        }}
                        style={{ alignSelf: 'flex-start' }}
                        sx={{
                            color: 'white',
                            '& .MuiSvgIcon-root': {
                                fontSize: 20,
                            },
                            '&.Mui-checked': {
                                color: '#d8b3f0ff',
                            },
                        }}
                    /> */}

                <img
                    className={styles.preview_image}
                    alt=""
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPTPFv3U6ZVvZh0GYlNFWntSw0PJjFvqNwMA&s'}
                />

                <div className={styles.preview_body}>
                    <div className={styles.preview_top}>
                        <div className={styles.genre_wrapper}>Фантастика</div>
                        <div className={styles.title_block}>
                            <p className={styles.preview_title}>Человек-паук</p>
                            <p className={styles.preview_author}>Марвелпедия</p>
                        </div>
                    </div>

                    <div className={styles.preview_bottom}>
                        <div className={styles.rating_row}>
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar className={styles.rating_star_muted} />

                            <p className={styles.rating_text}>4/5</p>
                        </div>
                        <div className={styles.info_divider}></div>
                        <div className={styles.meta_row}>
                            <div className={styles.meta_item}>
                                <MdOutlineDateRange className={styles.meta_icon} />
                                <p>15 сен 2023</p>
                            </div>
                            <div>
                                <div className={styles.meta_item}>
                                    <LuBookOpenText className={styles.meta_icon} />
                                    <p>520 стр.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.side_slot}>





            </div>
        </div>
    )

}

export default HistoryRecentPreview;
