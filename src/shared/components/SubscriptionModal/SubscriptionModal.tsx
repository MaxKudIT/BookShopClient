import type { FC } from 'react';
import { IoClose, IoSparklesOutline } from 'react-icons/io5';
import { MdCheckCircleOutline, MdCurrencyRuble } from 'react-icons/md';
import styles from './SubscriptionModal.module.scss';

type SubscriptionModalProps = {
    open: boolean;
    onClose: () => void;
}

const benefits = [
    'Доступ ко всем новинкам и подборкам',
    'Чтение без ограничений на любом устройстве',
    'Персональные рекомендации каждый день'
];

const SubscriptionModal: FC<SubscriptionModalProps> = ({ open, onClose }) => {
    if (!open) {
        return null;
    }

    return (
        <div className={styles.overlay} role="presentation" onMouseDown={onClose}>
            <section
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="subscription-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <button className={styles.close_button} type="button" aria-label="Закрыть" onClick={onClose}>
                    <IoClose />
                </button>

                <div className={styles.header}>
                    <div className={styles.icon}>
                        <IoSparklesOutline />
                    </div>
                    <div className={styles.header_text}>
                        <p className={styles.eyebrow}>Max Premium</p>
                        <h2 id="subscription-title" className={styles.title}>Оформление подписки</h2>
                        <p className={styles.description}>
                            Откройте полный каталог, рекомендации и свежие книги по единой подписке.
                        </p>
                    </div>
                </div>

                <div className={styles.plan_card_month}>
                    <div>
                        <p className={styles.plan_name}>Ежемесячный доступ</p>
                       
                    </div>

                    <div className={styles.price}>
                        <span>49</span>
                        <MdCurrencyRuble />
                        <p>/мес</p>
                    </div>
                </div>

                <div className={styles.plan_card}>
                    <div>
                        <p className={styles.plan_name}>Годовой доступ</p>
                  
                    </div>

                    <div className={styles.price}>
                        <span>479</span>
                        <MdCurrencyRuble />
                        <p>/год</p>
                    </div>
                </div>
                <div className={styles.benefits}>
                    {benefits.map((item) => (
                        <div key={item} className={styles.benefit}>
                            <MdCheckCircleOutline />
                            <p>{item}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.actions}>
                    <button className={styles.primary_button} type="button">
                        Подключить за 49 ₽
                    </button>
                    <button className={styles.secondary_button} type="button" onClick={onClose}>
                       Подключить за 479 ₽
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SubscriptionModal;
