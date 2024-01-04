import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteAdminDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}