import React, { type FC } from "react";
import type { IconType } from "react-icons";
import styles from './BookInfoComponent.module.scss'
export type BICProps = {
  title: string
  icon: IconType
  var1: string,
  color: 'rgba(186, 138, 234, 0.51)' 
  | 'rgba(230, 135, 58, 0.47)' 
  | 'rgba(214, 63, 133, 0.4)' 
  | 'rgba(63, 128, 214, 0.42)'
}

const BookInfoComponent: FC<BICProps> = ({ title, icon, var1, color }) => {
  return (
    <div className={styles.bic_block}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        background: color,
        borderRadius: 10
        }}>
        {icon({ style: { fontSize: 24, color: '#FFFFFFFF' } })}
      </div>
      <div style={{
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center'
        }}>
        <p style={{ color: '#C0C2C8FF', fontSize: 10, fontWeight: 500 }}>{title}</p>
        <p style={{ color: '#FFFFFFFF', fontSize: 18, fontWeight: 500 }}>{var1}</p>
      </div>

    </div>
  )
}

export default BookInfoComponent;