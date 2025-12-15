import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsIn,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Sanitize } from '../../common/decorators/sanitize.decorator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Employee full name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Sanitize()
  name: string;

  @ApiProperty({ description: 'Job title', example: 'Software Engineer' })
  @IsString()
  @IsNotEmpty({ message: 'Job title is required' })
  @Sanitize()
  jobTitle: string;

  @ApiProperty({ description: 'Department name', example: 'Engineering' })
  @IsString()
  @IsNotEmpty({ message: 'Department is required' })
  @Sanitize()
  department: string;

  @ApiPropertyOptional({ description: 'Manager ID', example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'Manager ID must be a number' })
  managerId?: number | null;

  @ApiPropertyOptional({
    description: 'Photo path',
    example: '/photos/john.jpg',
  })
  @IsOptional()
  @IsString()
  @Sanitize()
  photoPath?: string;

  @ApiProperty({
    description: 'Employee type',
    enum: ['Employee', 'Partner'],
    example: 'Employee',
  })
  @IsIn(['Employee', 'Partner'], {
    message: 'Type must be Employee or Partner',
  })
  type: 'Employee' | 'Partner';

  @ApiPropertyOptional({
    description: 'Employee status',
    enum: ['Active', 'Inactive'],
    example: 'Active',
  })
  @IsOptional()
  @IsIn(['Active', 'Inactive'], {
    message: 'Status must be Active or Inactive',
  })
  status?: 'Active' | 'Inactive';

  @ApiProperty({
    description: 'Work email address',
    example: 'john.doe@company.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Work email is required' })
  @Sanitize()
  workEmail: string;

  @ApiProperty({
    description: 'Hire date in ISO format',
    example: '2024-01-15',
  })
  @IsDateString({}, { message: 'Hire date must be a valid date string' })
  @IsNotEmpty({ message: 'Hire date is required' })
  hireDate: string;

  @ApiProperty({ description: 'Work location', example: 'São Paulo, Brazil' })
  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  @Sanitize()
  location: string;
}
