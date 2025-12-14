'use client';

import { useLanguage, Language } from '../i18n';
import styles from './LanguageSelector.module.css';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  return (
    <div className={styles.selector}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`${styles.button} ${language === lang.code ? styles.active : ''}`}
          title={lang.label}
        >
          <span className={styles.flag}>{lang.flag}</span>
          <span className={styles.label}>{lang.code === 'pt-BR' ? 'PT' : 'EN'}</span>
        </button>
      ))}
    </div>
  );
}
