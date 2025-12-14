'use client';

import { useState } from 'react';
import { Employee } from '../types/employee';
import EmployeePhoto from './EmployeePhoto';
import EmployeeDetailModal from './EmployeeDetailModal';
import styles from './EmployeeTable.module.css';

interface EmployeeTableProps {
  employees: Employee[];
}

type ViewMode = 'table' | 'list';

export default function EmployeeTable({ employees }: EmployeeTableProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [managerFilter, setManagerFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const departments = [...new Set(employees.map((e) => e.department))].sort();
  
  const managers = employees
    .filter((e) => employees.some((emp) => emp.managerId === e.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.workEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      !departmentFilter || employee.department === departmentFilter;
    const matchesManager =
      !managerFilter || employee.managerId === parseInt(managerFilter);
    const matchesType =
      !typeFilter || employee.type === typeFilter;
    const matchesStatus =
      !statusFilter || employee.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesManager && matchesType && matchesStatus;
  });

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.filterRow}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.inputField}
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className={styles.selectField}
          >
            <option value="">Departamento</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            value={managerFilter}
            onChange={(e) => setManagerFilter(e.target.value)}
            className={styles.selectField}
          >
            <option value="">Gerente</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={styles.selectField}
          >
            <option value="">Tipo</option>
            <option value="Employee">Funcionário</option>
            <option value="Partner">Parceiro</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.selectField}
          >
            <option value="">Status</option>
            <option value="Active">Ativo</option>
            <option value="Inactive">Inativo</option>
          </select>
          <div className={styles.toggleGroup}>
            <button
              onClick={() => setViewMode('table')}
              className={`${styles.toggleBtn} ${viewMode === 'table' ? styles.toggleBtnActive : styles.toggleBtnInactive}`}
            >
              Tabela
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleBtnActive : styles.toggleBtnInactive}`}
            >
              Lista
            </button>
          </div>
        </div>
      </div>

      <div className={styles.cardContent}>
        {viewMode === 'table' ? (
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr className={styles.tableHeaderRow}>
                  <th className={styles.tableHeaderCell}>Foto</th>
                  <th className={styles.tableHeaderCell}>Nome</th>
                  <th className={`${styles.tableHeaderCell} ${styles.hiddenMobile}`}>Cargo</th>
                  <th className={`${styles.tableHeaderCell} ${styles.hiddenTablet}`}>Departamento</th>
                  <th className={`${styles.tableHeaderCell} ${styles.hiddenDesktop}`}>Localização</th>
                  <th className={styles.tableHeaderCell}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr 
                    key={employee.id} 
                    className={styles.tableRow}
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <td className={styles.tableCell}>
                      <div className={styles.avatarSm}>
                        <EmployeePhoto src={employee.photoPath} alt={employee.name} />
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.employeeName}>{employee.name}</div>
                      <div className={styles.employeeEmail}>{employee.workEmail}</div>
                      <div className={styles.employeeJobMobile}>{employee.jobTitle}</div>
                    </td>
                    <td className={`${styles.tableCell} ${styles.hiddenMobile}`}>{employee.jobTitle}</td>
                    <td className={`${styles.tableCell} ${styles.hiddenTablet}`}>{employee.department}</td>
                    <td className={`${styles.tableCell} ${styles.hiddenDesktop}`}>{employee.location}</td>
                    <td className={styles.tableCell}>
                      <span className={employee.status === 'Active' ? styles.badgeActive : styles.badgeInactive}>
                        {employee.status === 'Active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.listGrid}>
            {filteredEmployees.map((employee) => (
              <div 
                key={employee.id} 
                className={styles.listCard}
                onClick={() => setSelectedEmployee(employee)}
              >
                <div className={styles.listCardContent}>
                  <div className={styles.avatarMd}>
                    <EmployeePhoto src={employee.photoPath} alt={employee.name} />
                  </div>
                  <div className={styles.listCardInfo}>
                    <h3 className={styles.employeeName}>{employee.name}</h3>
                    <p className={styles.employeeJob}>{employee.jobTitle}</p>
                    <p className={styles.employeeDept}>{employee.department}</p>
                    <div className={styles.listCardMeta}>
                      <span className={employee.status === 'Active' ? styles.badgeActive : styles.badgeInactive}>
                        {employee.status === 'Active' ? 'Ativo' : 'Inativo'}
                      </span>
                      <span className={styles.employeeLocation}>{employee.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredEmployees.length === 0 && (
          <div className={styles.emptyState}>Nenhum funcionário encontrado</div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.textHighlight}>{filteredEmployees.length}</span> de{' '}
        <span className={styles.textBold}>{employees.length}</span> funcionários
      </div>

      <EmployeeDetailModal
        employee={selectedEmployee}
        employees={employees}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}
