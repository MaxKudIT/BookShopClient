import styles from './Auth.module.scss'
import Registration from '../../features/Registration/Registration';
import Authorization from '../../features/Authorization/Authorization';
const Auth = () =>
  {
    return (
      <div className={styles.auth_page_styles}>
        <Authorization/>
        <Registration/>
      </div>
    )
  }

  export {Auth};