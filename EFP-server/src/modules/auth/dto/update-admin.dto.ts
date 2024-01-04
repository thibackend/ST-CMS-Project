import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    password?: string;
}