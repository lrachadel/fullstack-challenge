'use client';

import { useState, useEffect } from 'react';
import { Employee } from '../types/employee';
import { useLanguage } from '../i18n';
import { employeeService } from '../services/employeeService';
import styles from './EmployeeFormModal.module.css';

interface EmployeeFormModalProps {
  employee?: Employee | null;
  employees: Employee[];
  onClose: () => void;
  onSave: () => void;
}

type EmployeeFormData = {
  name: string;
  jobTitle: string;
  department: string;
  managerId: string;
  photoPath: string;
  type: 'Employee' | 'Partner';
  status: 'Active' | 'Inactive';
  workEmail: string;
  hireDate: string;
  location: string;
};

const initialFormData: EmployeeFormData = {
  name: '',
  jobTitle: '',
  department: '',
  managerId: '',
  photoPath: '',
  type: 'Employee',
  status: 'Active',
  workEmail: '',
  hireDate: '',
  location: '',
};

export default function EmployeeFormModal({ 
  employee, 
  employees, 
  onClose, 
  onSave 
}: EmployeeFormModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!employee;

  const departments = [...new Set(employees.map((e) => e.department))].sort();
  const locations = [...new Set(employees.map((e) => e.location))].sort();
  const potentialManagers = employees
    .filter((e) => !employee || e.id !== employee.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        jobTitle: employee.jobTitle,
        department: employee.department,
        managerId: employee.managerId?.toString() || '',
        photoPath: employee.photoPath,
        type: employee.type,
        status: employee.status,
        workEmail: employee.workEmail,
        hireDate: employee.hireDate?.split('T')[0] || '',
        location: employee.location,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (isEditing && employee) {
        const updatePayload = {
          name: formData.name,
          jobTitle: formData.jobTitle,
          department: formData.department,
          managerId: formData.managerId ? parseInt(formData.managerId) : null,
          photoPath: formData.photoPath,
          workEmail: formData.workEmail,
          location: formData.location,
        };
        await employeeService.update(employee.id, updatePayload);
      } else {
        const createPayload = {
          name: formData.name,
          jobTitle: formData.jobTitle,
          department: formData.department,
          managerId: formData.managerId ? parseInt(formData.managerId) : null,
          photoPath: formData.photoPath,
          type: formData.type,
          workEmail: formData.workEmail,
          hireDate: formData.hireDate,
          location: formData.location,
        };
        await employeeService.create(createPayload as Omit<Employee, 'id' | 'status'>);
      }

      onSave();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar funcionário');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEditing ? t.employeeForm.editEmployee : t.employeeForm.newEmployee}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{t.employeeForm.name} *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{t.employeeForm.email} *</label>
              <input
                type="email"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{t.employeeForm.jobTitle} *</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{t.employeeForm.department} *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={styles.input}
                list="departments"
                required
              />
              <datalist id="departments">
                {departments.map((dept) => (
                  <option key={dept} value={dept} />
                ))}
              </datalist>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{t.employeeForm.manager}</label>
              <select
                name="managerId"
                value={formData.managerId}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">{t.employeeForm.noManager}</option>
                {potentialManagers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.name} - {manager.jobTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{t.employeeForm.location} *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={styles.input}
                list="locations"
                required
              />
              <datalist id="locations">
                {locations.map((loc) => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>
            </div>

            {!isEditing && (
              <div className={styles.formGroup}>
                <label className={styles.label}>{t.employeeForm.hireDate} *</label>
                <input
                  type="date"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            )}

            {!isEditing && (
              <div className={styles.formGroup}>
                <label className={styles.label}>{t.employeeForm.type} *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="Employee">{t.common.employee}</option>
                  <option value="Partner">{t.common.partner}</option>
                </select>
              </div>
            )}


            <div className={styles.formGroup}>
              <label className={styles.label}>{t.employeeForm.photoPath}</label>
              <input
                type="text"
                name="photoPath"
                value={formData.photoPath}
                onChange={handleChange}
                className={styles.input}
                placeholder={t.employeeForm.photoPlaceholder}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? t.common.saving : isEditing ? t.common.save : t.common.create}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
