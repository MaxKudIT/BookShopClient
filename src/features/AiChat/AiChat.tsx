import { useEffect, useRef, useState, type FormEvent } from 'react';
import { observer } from 'mobx-react-lite';
import {
    MdClose,
    MdDeleteOutline,
    MdOutlineAutoAwesome,
    MdOutlineChatBubbleOutline,
    MdSend,
} from 'react-icons/md';
import { useStores } from '../../store/context/GloabalContext';
import styles from './AiChat.module.scss';

const starterMessage = 'Привет. Могу помочь подобрать книгу, сравнить жанры или ответить на вопросы по библиотеке.';

const quickQuestions = [
    'Что почитать после Ведьмака?',
    'Посоветуй тёмное фэнтези',
    'Какая книга сейчас популярна?',
];

const AiChat = observer(() => {
    const { aiChatStore } = useStores();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const requestError = aiChatStore.currentChatState.error
        || aiChatStore.createChatState.error
        || aiChatStore.getMessagesState.error
        || aiChatStore.createMessageState.error
        || aiChatStore.deleteMessagesState.error
        || aiChatStore.askState.error;
    const isSending = aiChatStore.askState.loading;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [aiChatStore.messages.length, isSending]);

    useEffect(() => {
        if (isOpen) {
            aiChatStore.getMessages();
        }
    }, [isOpen, aiChatStore]);

    const sendMessage = async (text: string) => {
        const trimmedText = text.trim();

        if (!trimmedText || isSending) {
            return;
        }

        setInput('');

        await aiChatStore.ask(trimmedText);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessage(input);
    };

    const clearMessages = async () => {
        await aiChatStore.deleteMessages();
        setInput('');
    };

    return (
        <div className={styles.chat_root}>
            {isOpen && (
                <section className={styles.chat_panel} aria-label="AI помощник библиотеки">
                    <div className={styles.panel_header}>
                        <div className={styles.assistant_identity}>
                            <div className={styles.assistant_icon}>
                                <MdOutlineAutoAwesome />
                            </div>
                            <div>
                                <p className={styles.assistant_name}>Помощник библиотеки</p>
                                <p className={styles.assistant_status}>онлайн</p>
                            </div>
                        </div>

                        <div className={styles.header_actions}>
                            <button
                                type="button"
                                className={styles.icon_button}
                                onClick={clearMessages}
                                disabled={aiChatStore.deleteMessagesState.loading}
                                aria-label="Очистить чат"
                            >
                                <MdDeleteOutline />
                            </button>
                            <button
                                type="button"
                                className={styles.icon_button}
                                onClick={() => setIsOpen(false)}
                                aria-label="Закрыть чат"
                            >
                                <MdClose />
                            </button>
                        </div>
                    </div>

                    <div className={styles.quick_questions}>
                        {quickQuestions.map((question) => (
                            <button
                                type="button"
                                key={question}
                                className={styles.quick_question}
                                onClick={() => sendMessage(question)}
                                disabled={isSending}
                            >
                                {question}
                            </button>
                        ))}
                    </div>

                    <div className={styles.messages}>
                        {aiChatStore.messages.length === 0 && (
                            <div className={styles.message_row}>
                                <div className={`${styles.message_bubble} ${styles.assistant_bubble}`}>
                                    {starterMessage}
                                </div>
                            </div>
                        )}

                        {aiChatStore.messages.map((message) => (
                            <div
                                key={message.Id}
                                className={`${styles.message_row} ${
                                    message.Role === 'user' ? styles.message_row_user : ''
                                }`}
                            >
                                <div
                                    className={`${styles.message_bubble} ${
                                        message.Role === 'user'
                                            ? styles.user_bubble
                                            : styles.assistant_bubble
                                    }`}
                                >
                                    {message.Content}
                                </div>
                            </div>
                        ))}

                        {isSending && (
                            <div className={styles.message_row}>
                                <div className={`${styles.message_bubble} ${styles.assistant_bubble}`}>
                                    <div className={styles.typing}>
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </div>
                            </div>
                        )}

                        {requestError && (
                            <div className={styles.error_notice}>
                                {requestError}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className={styles.input_bar} onSubmit={handleSubmit}>
                        <input
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder="Спросите о книгах..."
                            disabled={isSending}
                        />
                        <button
                            type="submit"
                            className={styles.send_button}
                            disabled={!input.trim() || isSending}
                            aria-label="Отправить вопрос"
                        >
                            <MdSend />
                        </button>
                    </form>
                </section>
            )}

            <button
                type="button"
                className={`${styles.launch_button} ${isOpen ? styles.launch_button_open : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? 'Свернуть AI чат' : 'Открыть AI чат'}
            >
                {isOpen ? <MdClose /> : <MdOutlineChatBubbleOutline />}
            </button>
        </div>
    );
});

export default AiChat;
