import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAdminDto {
    @IsOptional()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    email: string;
}