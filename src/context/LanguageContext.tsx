'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import fr from '../locales/fr.json';
import en from '../locales/en.json';

type Language = 'fr' | 'en';
type Dictionary = typeof fr;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dictionaries = { fr, en };

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('fr');

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
            setLanguageState(savedLang);
        } else {
            const browserLang = navigator.language.split('-')[0];
            if (browserLang === 'en') {
                setLanguageState('en');
            }
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
    };

    const t = (keyPath: string): string => {
        const keys = keyPath.split('.');
        let value: any = dictionaries[language];

        for (const key of keys) {
            if (value && value[key]) {
                value = value[key];
            } else {
                return keyPath; // Fallback to key if not found
            }
        }

        return typeof value === 'string' ? value : keyPath;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dict: dictionaries[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
