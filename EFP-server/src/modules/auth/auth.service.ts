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
      email: "thi.a24technology@gmail.com"
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

  async forgotPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomLength = 6; // You can change this to the desired length of your random text
    function generateRandomText() {
      let randomText = '';
      for (let i = 0; i < randomLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters.charAt(randomIndex);
      }
      return randomText;
    }
    const ramdomPassword = ("admin_" + generateRandomText()).toString();
    const admin = await this.adminRepository.findOne({ where: { email: "thi.a24technology@gmail.com" } });

    if (!admin) {
      return { error: "Admin not found!" };
    }
    admin.password = await bcrypt.hash(ramdomPassword, 10);
    await this.adminRepository.save(admin);
    const status = await this.mailService.sendNewPassword(ramdomPassword);
    if (status) {
      return { status: true, message: 'We have been sent your password! Please check your EMAIL' }
    }
  }
}

