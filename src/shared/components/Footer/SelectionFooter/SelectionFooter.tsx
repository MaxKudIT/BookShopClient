import { useEffect } from "react";
import { useSearch, useMyBooksSearch } from "../../../../store/context/SearchContext";
import styles from './SelectionFooter.module.scss'

const footerLinks = [
    {
        href: 'https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BC%D0%BE%D1%89%D1%8C',
        label: 'Помощь'
    },
    {
        href: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8C',
        label: 'Конфиденциальность'
    },
    {
        href: 'https://ru.wikipedia.org/wiki/%D0%A3%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F_%D0%B8_%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F',
        label: 'Условия'
    },
    {
        href: 'https://ru.wikipedia.org/wiki/%D0%90%D0%B2%D1%82%D0%BE%D1%80',
        label: 'Для авторов'
    }
];

const SelectionFooter = () => {
    const { setsearchingValue } = useSearch()
    const { setsearchingValue: setSearchingValueMy } = useMyBooksSearch()

    useEffect(() => {
        return () => {
            setsearchingValue('');
            setSearchingValueMy('')
        };
    }, [setSearchingValueMy, setsearchingValue]);

    return (
        <footer className={styles.selection_footer}>
            <nav className={styles.footer_links}>
                {footerLinks.map((link) => (
                    <a key={link.label} href={link.href}>{link.label}</a>
                ))}
            </nav>
            <p className={styles.footer_copy}>© 2026 Magma. Все права защищены.</p>
        </footer>
    )
}

export default SelectionFooter;
