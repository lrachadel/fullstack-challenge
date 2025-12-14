import EmployeeTable from '../../components/EmployeeTable';
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

export default async function TablePage() {
  const employees = await getEmployees();

  return (
    <main className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Lista de Funcionários</h1>
        <p className={styles.pageDescription}>
          Visualize todos os funcionários em formato de tabela ou lista
        </p>
      </div>
      <EmployeeTable employees={employees} />
    </main>
  );
}
