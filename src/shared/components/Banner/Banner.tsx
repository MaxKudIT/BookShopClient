import { IoBookOutline } from "react-icons/io5";
import styles from './Banner.module.scss'
import type { IconType } from "react-icons";
import type { FC } from "react";

export type BannerProps = {
    icon: IconType,
    title: string,
    description: string,
    color: string
}

const Banner: FC<BannerProps> = ({ icon: Icon, title, description, color }) => {
    return (
        <section className={styles.banner}>
            <div className={styles.banner_content}>
                <div className={styles.banner_icon} style={{ color }}>
                    <Icon />
                </div>

                <p className={styles.banner_title}>{title}</p>
                <p className={styles.banner_description}>{description}</p>
                <div className={styles.banner_actions}>
                    <button className={styles.sub_prem_button_one}>
                        Перейти к оформлению
                    </button>
                    <button className={styles.sub_prem_button_two}>
                        <IoBookOutline />
                        Продолжить чтение
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Banner;
