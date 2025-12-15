'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Employee } from '../types/employee';
import { useLanguage } from '../i18n';
import { useAuth } from '../auth';
import { employeeService } from '../services/employeeService';
import EmployeePhoto from './EmployeePhoto';
import ConfirmModal from './ConfirmModal';
import styles from './EmployeeDetailModal.module.css';

interface EmployeeDetailModalProps {
  employee: Employee | null;
  employees: Employee[];
  onClose: () => void;
  onEdit?: (employee: Employee) => void;
  onDeactivate?: () => void;
}

export default function EmployeeDetailModal({ employee, employees, onClose, onEdit, onDeactivate }: EmployeeDetailModalProps) {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeactivateClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDeactivate = async () => {
    if (!employee || employee.status === 'Inactive') return;
    
    try {
      setIsDeactivating(true);
      setError(null);
      await employeeService.remove(employee.id);
      setShowConfirmModal(false);
      if (onDeactivate) {
        onDeactivate();
      }
      onClose();
    } catch (err) {
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        setError(t.auth.notAuthenticated);
        setShowConfirmModal(false);
        setTimeout(() => router.push('/login'), 1500);
      } else {
        console.error('Erro ao desativar funcionário:', err);
        setShowConfirmModal(false);
      }
    } finally {
      setIsDeactivating(false);
    }
  };
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
                {employee.status === 'Active' ? t.common.active : t.common.inactive}
              </span>
              <span className={styles.badgeType}>
                {employee.type === 'Employee' ? t.common.employee : t.common.partner}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {error && (
            <div className={styles.error}>{error}</div>
          )}
          <div className={styles.actionButtons}>
            {onEdit && (
              <button 
                className={styles.editButton}
                onClick={() => onEdit(employee)}
              >
                {t.employeeDetail.editEmployee}
              </button>
            )}
            {onDeactivate && employee.status === 'Active' && (
              <button 
                className={styles.deactivateButton}
                onClick={handleDeactivateClick}
                disabled={isDeactivating}
              >
                {t.employeeDetail.deactivateEmployee}
              </button>
            )}
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t.employeeDetail.information}</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{t.employeeDetail.department}</span>
                <span className={styles.infoValue}>{employee.department}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{t.employeeDetail.location}</span>
                <span className={styles.infoValue}>{employee.location}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{t.employeeDetail.email}</span>
                <span className={styles.infoValue}>{employee.workEmail}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>{t.employeeDetail.hireDate}</span>
                <span className={styles.infoValue}>
                  {new Date(employee.hireDate).toLocaleDateString(language === 'pt-BR' ? 'pt-BR' : 'en-US')}
                </span>
              </div>
            </div>
          </div>

          {manager && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{t.employeeDetail.manager}</h3>
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
              {t.employeeDetail.directReports} ({directReports.length})
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
              <p className={styles.emptyText}>{t.employeeDetail.noDirectReports}</p>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        title={t.confirmModal.deactivateTitle}
        message={t.confirmModal.deactivateMessage.replace('{name}', employee.name)}
        confirmText={t.confirmModal.deactivate}
        cancelText={t.common.cancel}
        variant="danger"
        isLoading={isDeactivating}
        onConfirm={handleConfirmDeactivate}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
}
