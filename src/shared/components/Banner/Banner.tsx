import { IoBookOutline } from "react-icons/io5";
import styles from './Banner.module.scss'
import type { IconType } from "react-icons";
import { useState, type FC } from "react";
import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";

export type BannerProps = {
    icon: IconType,
    title: string,
    description: string,
    color: string
}

const Banner: FC<BannerProps> = ({ icon: Icon, title, description, color }) => {
    const [subscriptionOpen, setSubscriptionOpen] = useState(false);
    const [bannerVisible, setBannerVisible] = useState(true);

    if (!bannerVisible) {
        return null;
    }

    return (
        <>
            <section className={styles.banner}>
                <div className={styles.banner_content}>
                    <div className={styles.banner_icon} style={{ color }}>
                        <Icon />
                    </div>

                    <p className={styles.banner_title}>{title}</p>
                    <p className={styles.banner_description}>{description}</p>
                    <div className={styles.banner_actions}>
                        <button
                            className={styles.sub_prem_button_one}
                            type="button"
                            onClick={() => setSubscriptionOpen(true)}
                        >
                            Перейти к оформлению
                        </button>
                        <button
                            className={styles.sub_prem_button_two}
                            type="button"
                            onClick={() => setBannerVisible(false)}
                        >
                            <IoBookOutline />
                            Продолжить чтение
                        </button>
                    </div>
                </div>
            </section>

            <SubscriptionModal open={subscriptionOpen} onClose={() => setSubscriptionOpen(false)} />
        </>
    )
}

export default Banner;
