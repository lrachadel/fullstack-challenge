import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(
    OmitType(CreateEmployeeDto, ['hireDate', 'type'] as const)
) {}
