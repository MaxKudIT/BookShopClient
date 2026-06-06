import { useEffect, type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { IoClose, IoSparklesOutline } from 'react-icons/io5';
import { MdCheckCircleOutline, MdCurrencyRuble } from 'react-icons/md';
import { useStores } from '../../../store/context/GloabalContext';
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

const SubscriptionModal: FC<SubscriptionModalProps> = observer(({ open, onClose }) => {
    const {
        subscriptionStore: {
            plans,
            selectedPlanId,
            getPlans,
            buyPlan,
            getPlansState,
            buyPlanState,
        },
    } = useStores();

    useEffect(() => {
        if (!open) {
            return;
        }

        getPlans();
    }, [open, getPlans]);

    const planPeriod = (durationDays: number) => {
        if (durationDays >= 365) {
            return '/год';
        }

        return '/мес';
    };

    const handlePurchase = async (planId: string) => {
        const isSuccess = await buyPlan(planId);
        if (isSuccess) {
            onClose();
        }
    };

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

                <div className={styles.plans}>
                    {getPlansState.loading && (
                        <div className={styles.plan_card}>
                            <p className={styles.plan_name}>Загрузка тарифов...</p>
                        </div>
                    )}

                    {!getPlansState.loading && plans.map((plan, index) => (
                        <div
                            className={index === 0 ? styles.plan_card_month : styles.plan_card}
                            key={plan.Id}
                        >
                            <div>
                                <p className={styles.plan_name}>{plan.Title}</p>
                                {plan.Description && (
                                    <p className={styles.plan_hint}>{plan.Description}</p>
                                )}
                            </div>

                            <div className={styles.price}>
                                <span>{plan.Price}</span>
                                <MdCurrencyRuble />
                                <p>{planPeriod(plan.DurationDays)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.benefits}>
                    {benefits.map((item) => (
                        <div key={item} className={styles.benefit}>
                            <MdCheckCircleOutline />
                            <p>{item}</p>
                        </div>
                    ))}
                </div>

                {(getPlansState.error || buyPlanState.error) && (
                    <p className={styles.error_text}>{buyPlanState.error || getPlansState.error}</p>
                )}

                <div className={styles.actions}>
                    {plans.map((plan, index) => (
                        <button
                            className={index === 0 ? styles.primary_button : styles.secondary_button}
                            disabled={getPlansState.loading || buyPlanState.loading}
                            key={plan.Id}
                            onClick={() => handlePurchase(plan.Id)}
                            type="button"
                        >
                            {selectedPlanId === plan.Id ? 'Подключаем...' : `Подключить за ${plan.Price} ₽`}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
});

export default SubscriptionModal;
