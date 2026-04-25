import styles from './HistoryM.module.scss'
import HistoryF from '../../features/History/HistoryF';
const HistoryM = () => {
  return (
    <div className={styles.history_container}>
      <HistoryF/>
    </div>
  )
}

export default HistoryM;