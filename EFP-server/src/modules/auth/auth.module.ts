import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Admin } from "src/entities/admin.entity";

@Module(
    {
        imports: [TypeOrmModule.forFeature([Admin])],
        controllers: [AuthController],
        providers: [AuthService]
    }
)
export class AuthModule { }