export interface Employee {
  id: number;
  name: string;
  jobTitle: string;
  department: string;
  managerId: number | null;
  photoPath: string;
  type: 'Employee' | 'Partner';
  status: 'Active' | 'Inactive';
  workEmail: string;
  hireDate: string;
  location: string;
}

export interface EmployeeNode extends Employee {
  children: EmployeeNode[];
}
