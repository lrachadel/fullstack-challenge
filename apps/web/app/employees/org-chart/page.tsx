import OrgTreeWrapper from '../../components/OrgTreeWrapper';
import styles from '../page.module.css';

export default function OrgChartPage() {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Organograma</h1>
        <p className={styles.pageDescription}>
          Visualize a estrutura hierárquica da organização
        </p>
      </div>
      <OrgTreeWrapper />
    </main>
  );
}
