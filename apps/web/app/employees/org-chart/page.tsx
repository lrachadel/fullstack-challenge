import OrgTree from '../../components/OrgTree';
import { employeeService } from '../../services/employeeService';
import styles from '../page.module.css';

async function getEmployees() {
  try {
    return await employeeService.findAll();
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}

export default async function OrgChartPage() {
  const employees = await getEmployees();

  return (
    <main className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Organograma</h1>
        <p className={styles.pageDescription}>
          Visualize a estrutura hierárquica da organização
        </p>
      </div>
      <OrgTree employees={employees} />
    </main>
  );
}
