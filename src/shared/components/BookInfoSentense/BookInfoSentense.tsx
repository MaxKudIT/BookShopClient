import type { FC } from "react";
import type { IconType } from "react-icons";
import { IoMdInformationCircleOutline } from "react-icons/io";

export type BookInfoSentenseProps = {
    icon: IconType,
    title: string,
    text: string
}


const BookInfoSentense: FC<BookInfoSentenseProps> = ({ icon: Icon, title, text }) => {
    return (
        <div style={{
            background: '#6f7ec90d',
            border: '1px solid #5c6cbe1a',
            borderRadius: 10,
            width: '33%',
            display: 'flex',
            columnGap: 10,
            alignItems: 'center',
            padding: '15px 20px',

        }}>
            <div style={{
                background: 'rgba(99, 121, 233, 0.16)', 
                borderRadius: 50, 
                padding: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
                }}>
                <Icon style={{ color: '#6379E9FF', fontSize: 26, flexShrink: 0 }} />
            </div>

            <div>
                <p style={{
                    color: 'rgba(250, 249, 251, 0.92)',
                    fontSize: 16,
                    fontWeight: 500,
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    lineHeight: 1.5
                }}>{title}</p>
                <p style={{
                    color: '#b5bece',
                    fontSize: 14
                }}>{text}</p>
            </div>

        </div>
    )
}


export default BookInfoSentense;
