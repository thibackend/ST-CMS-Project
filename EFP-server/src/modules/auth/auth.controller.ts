import { Controller, Post, Get, Patch, Put, Delete, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { SignInDto } from "./dto/admin-signin.dto";

@Controller()
export class AuthController {
    constructor(private AuthService: AuthService) { }

    @Post('signup')
    signup(@Body() signUpNewAdminDto: CreateAdminDto) {
        return this.AuthService.signup(signUpNewAdminDto);
    }

    @Post('signin')
    signin(@Body() signInDto: SignInDto) {
        return this.AuthService.signin(signInDto)
    }
}