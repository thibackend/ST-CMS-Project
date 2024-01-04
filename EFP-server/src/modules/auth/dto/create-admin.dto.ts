import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}