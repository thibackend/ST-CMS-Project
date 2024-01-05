import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { Admin } from "src/entities/admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { SignInDto } from "./dto/admin-signin.dto";
import * as bcrypt from 'bcrypt';
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private readonly mailService: MailService, // Inject MailService here
    private readonly entityManager: EntityManager,
  ) { }

  async initialAdmin(signUpNewAdminDtoArray: CreateAdminDto) {
    // No need to use create and save for entities
    const newadmin = new Admin(signUpNewAdminDtoArray);
    await this.entityManager.save(newadmin)
  }

  async signup(signUpNewAdminDtoArray: CreateAdminDto) {
    // No need to use create and save for entities
    const newadmin = new Admin(signUpNewAdminDtoArray);
    const result = await this.entityManager.save(newadmin)
    return { data: result, message: "Signup Successful!" }
  }


  async generateDefaultAdmin() {
    // No need to use create and save for entities
    const defaultAdmin = {
      username: "admin",
      password: "admin123",
      email: "admin@gmail.com"
    }
    const { email, username, password } = defaultAdmin;
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      const newadmin = new Admin(defaultAdmin);
      const result = await this.entityManager.save(newadmin)
      return { data: { username, email, password }, message: "Generate Admin Successful! _1" }
    } else {
      return { data: { username, email, password }, message: "Generate Admin Successful! _n" }
    }
  }

  async signin(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const usercredentials = { email: admin.email, username: admin.username }
      return { data: usercredentials, isPass: true, message: "Sign in successful" }
    }
    return { message: "Invalid credentials", isPass: false }
  }

  async resetPassword(updateAdminDto: UpdateAdminDto) {
    const { password, id, username, newpassword } = updateAdminDto;
    const admin = await this.adminRepository.findOne({ where: { id } });

    if (!admin) {
      return { error: "Admin not found!" };
    }

    const checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) {
      return { error: "Current password doesn't match!" };
    }

    admin.password = await bcrypt.hash(newpassword, 10);
    // await this.adminRepository.save(admin);
    await this.mailService.sendNewPassword(admin.email, username, admin.email, newpassword);
    return { message: `Reset password successful!` };
  }
}

