import { Employee } from '../types/employee';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export const employeeService = {
  async findAll(): Promise<Employee[]> {
    const res = await fetch(`${API_BASE_URL}/employee`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch employees');
    }
    return res.json();
  },

  async findOne(id: number): Promise<Employee> {
    const res = await fetch(`${API_BASE_URL}/employee/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch employee with id ${id}`);
    }
    return res.json();
  },

  async create(employee: Omit<Employee, 'id' | 'status'>): Promise<Employee> {
    const res = await fetch(`${API_BASE_URL}/employee/create-employee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!res.ok) {
      throw new Error('Failed to create employee');
    }
    return res.json();
  },

  async update(id: number, employee: Partial<Omit<Employee, 'hireDate' | 'type' | 'status'>>): Promise<Employee> {
    const res = await fetch(`${API_BASE_URL}/employee/update-employee/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!res.ok) {
      throw new Error(`Failed to update employee with id ${id}`);
    }
    return res.json();
  },

  async remove(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/employee/delete-employee/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`Failed to delete employee with id ${id}`);
    }
  },
};
