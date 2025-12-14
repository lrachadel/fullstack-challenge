'use client';

import { useState } from 'react';
import { Employee } from '../types/employee';
import { useLanguage } from '../i18n';
import EmployeePhoto from './EmployeePhoto';
import EmployeeDetailModal from './EmployeeDetailModal';
import EmployeeFormModal from './EmployeeFormModal';
import styles from './EmployeeTable.module.css';

interface EmployeeTableProps {
  employees: Employee[];
  onRefresh?: () => void;
}

type ViewMode = 'table' | 'list';

export default function EmployeeTable({ employees, onRefresh }: EmployeeTableProps) {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const departments = [...new Set(employees.map((e) => e.department))].sort();

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.workEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      !departmentFilter || employee.department === departmentFilter;
    const matchesType =
      !typeFilter || employee.type === typeFilter;
    const matchesStatus =
      !statusFilter || employee.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesType && matchesStatus;
  });

  const handleAddNew = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
    setSelectedEmployee(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleFormSave = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.filterRow}>
          <input
            type="text"
            placeholder={t.common.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.inputField}
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className={styles.selectField}
          >
            <option value="">{t.common.department}</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={styles.selectField}
          >
            <option value="">{t.common.type}</option>
            <option value="Employee">{t.common.employee}</option>
            <option value="Partner">{t.common.partner}</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.selectField}
          >
            <option value="">{t.common.status}</option>
            <option value="Active">{t.common.active}</option>
            <option value="Inactive">{t.common.inactive}</option>
          </select>
          <div className={styles.toggleGroup}>
            <button
              onClick={() => setViewMode('table')}
              className={`${styles.toggleBtn} ${viewMode === 'table' ? styles.toggleBtnActive : styles.toggleBtnInactive}`}
            >
              {t.employeeTable.table}
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleBtnActive : styles.toggleBtnInactive}`}
            >
              {t.employeeTable.list}
            </button>
          </div>
          <button
            onClick={handleAddNew}
            className={styles.addButton}
          >
            {t.employeeTable.add}
          </button>
        </div>
      </div>

      <div className={styles.cardContent}>
        {viewMode === 'table' ? (
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr className={styles.tableHeaderRow}>
                  <th className={styles.tableHeaderCell}>{t.employeeTable.photo}</th>
                  <th className={styles.tableHeaderCell}>{t.employeeTable.name}</th>
                  <th className={`${styles.tableHeaderCell} ${styles.hiddenMobile}`}>{t.employeeTable.jobTitle}</th>
                  <th className={`${styles.tableHeaderCell} ${styles.hiddenTablet}`}>{t.common.department}</th>
                  <th className={`${styles.tableHeaderCell} ${styles.hiddenDesktop}`}>{t.employeeTable.location}</th>
                  <th className={styles.tableHeaderCell}>{t.common.status}</th>
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
                        {employee.status === 'Active' ? t.common.active : t.common.inactive}
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
                        {employee.status === 'Active' ? t.common.active : t.common.inactive}
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
          <div className={styles.emptyState}>{t.employeeTable.noEmployeesFound}</div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.textHighlight}>{filteredEmployees.length}</span> {t.common.of}{' '}
        <span className={styles.textBold}>{employees.length}</span> {t.common.employees}
      </div>

      <EmployeeDetailModal
        employee={selectedEmployee}
        employees={employees}
        onClose={() => setSelectedEmployee(null)}
        onEdit={handleEdit}
        onDeactivate={onRefresh}
      />

      {showForm && (
        <EmployeeFormModal
          employee={editingEmployee}
          employees={employees}
          onClose={handleFormClose}
          onSave={handleFormSave}
        />
      )}
    </div>
  );
}
