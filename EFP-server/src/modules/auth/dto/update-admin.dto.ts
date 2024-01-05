import { IsNotEmpty, IsOptional, IsString, isNotEmpty } from 'class-validator';

export class UpdateAdminDto {

    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsNotEmpty()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    newpassword?: string;

    @IsNotEmpty()
    @IsString()
    email?: string;
}