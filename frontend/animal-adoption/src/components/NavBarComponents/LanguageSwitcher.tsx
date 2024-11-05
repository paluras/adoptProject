import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <div>
            <button onClick={() => i18n.changeLanguage('en')}>en</button>
            <span> | </span>
            <button onClick={() => i18n.changeLanguage('ro')}>ro</button>
        </div>
    );
}
export default LanguageSwitcher;