import styles from './Auth.module.scss'
import Registration from '../../features/Registration/Registration';
import Authorization from '../../features/Authorization/Authorization';
import { MdOutlineLocalLibrary } from "react-icons/md";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RiHqLine } from 'react-icons/ri';





const Auth = () => {

  return (
    <div className={styles.auth_page_styles}>
      <div className={styles.auth_blocks_wrapper}>
        <div className={styles.auth_first_block}>
          <div style={{ display: 'flex', columnGap: 10, alignItems: 'center', marginBottom: 30 }}>
            <div style={{
              background: '#6379E9FF',
              borderRadius: 8,
              padding: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MdOutlineLocalLibrary style={{ color: '#161A22FF', fontSize: 23 }} />
            </div>
            <p style={{ fontFamily: 'Montserrat', fontSize: 26, color: '#6379E9FF', fontWeight: 500 }}>MaxLib</p>
          </div>
          <p style={{
            fontSize: 40,
            wordBreak: 'break-word',
            fontFamily: 'Inter',
            lineHeight: 1.2,
            fontWeight: 700,
            color: '#F3F4F6FF',
            marginBottom: 25
          }}>
            Ваша
            персональная
            <span style={{ fontFamily: 'Montserrat', color: '#6379E9FF', fontSize: 33 }}> библиотека</span> в
            одном окне</p>

          <p style={{
            color: '#BDC1CAFF',

            fontWeight: 400,
            lineHeight: 1.7,
            fontSize: 15,
            marginBottom: 50
          }}>
            Получите доступ к тысячам книг, персонализированным рекомендациям и уникальным предложениям.
          </p>

          <div style={{ display: 'flex', columnGap: 15, alignItems: 'center', marginBottom: 20 }}>
            <div style={{ padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#4969c21a', borderRadius: 50 }}>
              <RiHqLine style={{ color: '#6379E9FF', fontSize: 22 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
              <p style={{ fontSize: 16, color: '#F3F4F6FF', fontWeight: 500, fontFamily: 'Inter' }}>Высокое качество</p>
              <p style={{ fontSize: 12, color: '#BDC1CAFF', fontWeight: 400 }}>Наслаждайтесь книгами высочайшего уровня</p>
            </div>
          </div>

          <div style={{ display: 'flex', columnGap: 15, alignItems: 'center' }}>
            <div style={{ padding: 12, background: '#4969c21a', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IoIosCheckmarkCircleOutline style={{ color: '#6379E9FF', fontSize: 22 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
              <p style={{ fontSize: 16, color: '#F3F4F6FF', fontWeight: 500, fontFamily: 'Inter' }}>Без рекламы</p>
              <p style={{ fontSize: 12, color: '#BDC1CAFF', fontWeight: 400 }}>Никаких вредных баннеров - только чистая книга</p>
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: 'auto', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ fontSize: 10, color: 'rgb(107, 111, 117)', fontWeight: 500 }}>© 2026 MAXLIB</p>
            <div style={{ display: 'flex', columnGap: 15 }}>
              <a href='https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BC%D0%BE%D1%89%D1%8C' style={{ fontSize: 10, color: 'rgb(107, 111, 117)', fontWeight: 500 }}>Помощь</a>
              <a href={'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8C'} style={{ fontSize: 10, color: 'rgb(107, 111, 117)', fontWeight: 500 }}>Конфиденциальность</a>
            </div>
          </div>

        </div>
        <Authorization />
        <Registration />
      </div>

    </div >
  )
}

export { Auth };
