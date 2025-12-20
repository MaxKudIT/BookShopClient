import React, { type FC } from "react";
import type { IconType } from "react-icons";
import styles from './BookInfoComponent.module.scss'
export type BICProps = {
    title: string
    icon: IconType
    info: string
}

const BookInfoComponent: FC<BICProps> = ({title, icon, info}) =>
  {
    return (
      <div className={styles.bic_block}>
        <div style={{display: 'flex', columnGap: 5}}>
            {icon({style: {fontSize: 17, color: 'rgba(202, 137, 240, 0.5)'}})}
            <p style={{color: 'rgba(255,255,255,0.6', fontSize: 14}}>{title}</p>
        </div>
        <p style={{color: 'rgba(255,255,255,0.6', fontSize: 16}}>{info}</p>
      </div>
    )
  }

  export default BookInfoComponent;