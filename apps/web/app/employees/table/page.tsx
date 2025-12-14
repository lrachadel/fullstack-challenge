import EmployeeTableWrapper from '../../components/EmployeeTableWrapper';
import styles from '../page.module.css';

export default function TablePage() {
  return (
    <main className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Lista de Funcionários</h1>
        <p className={styles.pageDescription}>
          Visualize todos os funcionários em formato de tabela ou lista
        </p>
      </div>
      <EmployeeTableWrapper />
    </main>
  );
}
