'use client';

import EmployeeTableWrapper from '../../components/EmployeeTableWrapper';
import { useLanguage } from '../../i18n';
import styles from '../page.module.css';

export default function TablePage() {
  const { t } = useLanguage();
  
  return (
    <main className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{t.employeeTable.title}</h1>
        <p className={styles.pageDescription}>
          {t.employeeTable.description}
        </p>
      </div>
      <EmployeeTableWrapper />
    </main>
  );
}
