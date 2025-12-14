'use client';

import OrgTreeWrapper from '../../components/OrgTreeWrapper';
import { useLanguage } from '../../i18n';
import styles from '../page.module.css';

export default function OrgChartPage() {
  const { t } = useLanguage();
  
  return (
    <main className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t.orgTree.title}</h1>
        <p className={styles.pageDescription}>
          {t.orgTree.description}
        </p>
      </div>
      <OrgTreeWrapper />
    </main>
  );
}
