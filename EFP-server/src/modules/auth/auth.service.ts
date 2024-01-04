import { Injectable } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/entities/admin.entity";
import { EntityManager, Repository } from "typeorm";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { SignInDto } from "./dto/admin-signin.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    ) { }


    async signup(signUpNewAdminDtoArray: CreateAdminDto) {
        const result = await this.adminRepository.create(signUpNewAdminDtoArray);
        await this.adminRepository.save(result);
        return { data: result, message: "Signup Successful!" }
    }



    async signin(signInDto: SignInDto) {
        const { username, password } = signInDto;
        const admin = await this.adminRepository.findOne({ where: { username } })

        if (admin && (await bcrypt.compare(password, admin.password))) {
            return { data: admin, message: "Sign in successful" }
        }
        else {
            return { message: "Invalid credentials" }
        }
        // console.log(signInDto);
    }
}
