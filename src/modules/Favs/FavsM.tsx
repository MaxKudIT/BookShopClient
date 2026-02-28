import styles from './FavsM.module.scss'
import NavMediaComponent from "../../shared/components/Navigation/MediaNavigation/NavMediaComponent";
import FavsF from '../../features/Favs/FavsF';



const FavsM = () => {

 

  return (
    <div className={styles.book_info_page_style}>
      
     
     <FavsF/>
     
      <div style={{
        width: '100vw',
        height: '100px',
        background: 'rgba(170, 122, 202, 0.5)',
        position: 'absolute',
        zIndex: -1,
        bottom: 0
      }}></div>
    </div>
  )
}

export default FavsM;