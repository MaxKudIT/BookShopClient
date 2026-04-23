import { IoBagHandleOutline, IoBookOutline } from "react-icons/io5";
import styles from './Banner.module.scss'
import type { IconType } from "react-icons";
import type { FC } from "react";


export type BannerProps = {
    icon: IconType,
    title: string,
    description: string,
    color: string
}

const Banner: FC<BannerProps> = ({icon: Icon, title, description, color}) => {
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            height: 410,
            background: 'radial-gradient(circle at 100% 0%, #2D2F3EFF 0%, #1E2029FF 70%, rgb(25, 28, 41) 100%)',
            border: '1px solid #353746FF',
            borderRadius: 15,
            marginTop: 100,
            justifyContent: 'center',

        }}>

            <div style={{
                height: '100%',
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                padding: '50px 0',
                alignItems: 'center',
                minWidth: 500
            }}>
                <div style={{
                    background: '#5269E01A',
                    border: '2px solid #4a6fd333',
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 20,
                    width: 'fit-content'
                }}>
                    <Icon style={{
                        color: color,
                        fontSize: 34
                    }} />
                </div>

                <p style={{ fontSize: 30, color: '#F9F9FBFF', fontWeight: 700, marginBottom: 10 }}>{title}</p>
                <p style={{ color: '#DFE0E7FF', fontSize: 16, marginBottom: 40, textAlign: 'center' }}>{description}</p>
                <div style={{ display: 'flex', columnGap: 20 }}>
                    <button className={styles.sub_prem_button_one}>
                        Перейти к оформлению
                    </button>
                    <button className={styles.sub_prem_button_two}>
                        <IoBookOutline />
                        Продолжить чтение
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Banner;