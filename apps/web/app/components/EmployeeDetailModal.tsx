'use client';

import { Employee } from '../types/employee';
import EmployeePhoto from './EmployeePhoto';
import styles from './EmployeeDetailModal.module.css';

interface EmployeeDetailModalProps {
  employee: Employee | null;
  employees: Employee[];
  onClose: () => void;
}

export default function EmployeeDetailModal({ employee, employees, onClose }: EmployeeDetailModalProps) {
  if (!employee) return null;

  const manager = employee.managerId 
    ? employees.find(e => e.id === employee.managerId) 
    : null;

  const directReports = employees.filter(e => e.managerId === employee.id);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.header}>
          <div className={styles.avatar}>
            <EmployeePhoto src={employee.photoPath} alt={employee.name} />
          </div>
          <div className={styles.headerInfo}>
            <h2 className={styles.name}>{employee.name}</h2>
            <p className={styles.jobTitle}>{employee.jobTitle}</p>
            <div className={styles.badges}>
              <span className={employee.status === 'Active' ? styles.badgeActive : styles.badgeInactive}>
                {employee.status === 'Active' ? 'Ativo' : 'Inativo'}
              </span>
              <span className={styles.badgeType}>
                {employee.type === 'Employee' ? 'Funcionário' : 'Parceiro'}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Departamento</span>
                <span className={styles.infoValue}>{employee.department}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Localização</span>
                <span className={styles.infoValue}>{employee.location}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{employee.workEmail}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Data de Contratação</span>
                <span className={styles.infoValue}>
                  {new Date(employee.hireDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          {manager && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Gerente</h3>
              <div className={styles.personCard}>
                <div className={styles.personAvatar}>
                  <EmployeePhoto src={manager.photoPath} alt={manager.name} />
                </div>
                <div className={styles.personInfo}>
                  <span className={styles.personName}>{manager.name}</span>
                  <span className={styles.personTitle}>{manager.jobTitle}</span>
                </div>
              </div>
            </div>
          )}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Subordinados Diretos ({directReports.length})
            </h3>
            {directReports.length > 0 ? (
              <div className={styles.reportsList}>
                {directReports.map((report) => (
                  <div key={report.id} className={styles.personCard}>
                    <div className={styles.personAvatar}>
                      <EmployeePhoto src={report.photoPath} alt={report.name} />
                    </div>
                    <div className={styles.personInfo}>
                      <span className={styles.personName}>{report.name}</span>
                      <span className={styles.personTitle}>{report.jobTitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>Nenhum subordinado direto</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
