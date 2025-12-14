'use client';

import { useState, useEffect, useCallback } from 'react';
import { Employee } from '../types/employee';
import { useLanguage } from '../i18n';
import { employeeService } from '../services/employeeService';
import EmployeeTable from './EmployeeTable';

export default function EmployeeTableWrapper() {
  const { t } = useLanguage();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await employeeService.findAll();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar funcionários');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#757575' }}>
        {t.common.loading}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#DC2626' }}>
        {t.employeeTable.errorLoading}
        <button 
          onClick={fetchEmployees}
          style={{ 
            marginLeft: '12px', 
            padding: '8px 16px', 
            cursor: 'pointer',
            border: '1px solid #E0E0E0',
            borderRadius: '4px',
            background: '#fff'
          }}
        >
          {t.common.tryAgain}
        </button>
      </div>
    );
  }

  return <EmployeeTable employees={employees} onRefresh={fetchEmployees} />;
}
