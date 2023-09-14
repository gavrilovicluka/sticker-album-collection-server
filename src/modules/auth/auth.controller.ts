import { Body, Post, Get, UseGuards, Controller, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Roles } from './roles.decorator';
import { UserRoles } from '../user/enums/user-roles.enum';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return this.authService.signIn(loginDto.username, loginDto.password);
    }

    // @Roles(UserRoles.ADMIN)
    // @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Get('user')
    getUser(@Request() req) {
        return req.user;
    }

}
