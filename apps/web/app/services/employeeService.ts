import { Employee } from '../types/employee';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const employeeService = {
  async findAll(): Promise<Employee[]> {
    const res = await fetch(`${API_BASE_URL}employee`, {
      cache: 'no-store',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('UNAUTHORIZED');
      }
      throw new Error('Failed to fetch employees');
    }
    return res.json();
  },

  async findOne(id: number): Promise<Employee> {
    const res = await fetch(`${API_BASE_URL}employee/${id}`, {
      cache: 'no-store',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('UNAUTHORIZED');
      }
      throw new Error(`Failed to fetch employee with id ${id}`);
    }
    return res.json();
  },

  async create(employee: Omit<Employee, 'id' | 'status'>): Promise<Employee> {
    const res = await fetch(`${API_BASE_URL}employee/create-employee`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(employee),
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('UNAUTHORIZED');
      }
      throw new Error('Failed to create employee');
    }
    return res.json();
  },

  async update(id: number, employee: Partial<Omit<Employee, 'hireDate' | 'type' | 'status'>>): Promise<Employee> {
    const res = await fetch(`${API_BASE_URL}employee/update-employee/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(employee),
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('UNAUTHORIZED');
      }
      throw new Error(`Failed to update employee with id ${id}`);
    }
    return res.json();
  },

  async remove(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}employee/delete-employee/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('UNAUTHORIZED');
      }
      throw new Error(`Failed to delete employee with id ${id}`);
    }
  },
};
