'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageToggle.module.css';

const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();

    const switchLang = (lang: 'fr' | 'en') => {
        setLanguage(lang);
    };

    return (
        <div className={styles.toggleContainer}>
            <button
                className={`${styles.langBtn} ${language === 'fr' ? styles.active : ''}`}
                onClick={() => switchLang('fr')}
                aria-label="Passer en Français"
            >
                FR
            </button>
            <span className={styles.divider}>|</span>
            <button
                className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
                onClick={() => switchLang('en')}
                aria-label="Switch to English"
            >
                EN
            </button>
        </div>
    );
};

export default LanguageToggle;
