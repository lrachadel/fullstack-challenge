import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  jobTitle: string;

  @Column({ type: 'varchar', length: 300 })
  department: string;

  @Column({ type: 'integer', nullable: true })
  managerId: number | null;

  @Column({ type: 'varchar', length: 300 })
  photoPath: string;

  @Column({ type: 'varchar', length: 300 })
  type: 'Employee' | 'Partner';

  @Column({ type: 'varchar', length: 300 })
  status: 'Active' | 'Inactive';

  @Column({ type: 'varchar', length: 300 })
  workEmail: string;

  @Column({ type: 'date' })
  hireDate: string;

  @Column({ type: 'varchar', length: 300 })
  location: string;
}
