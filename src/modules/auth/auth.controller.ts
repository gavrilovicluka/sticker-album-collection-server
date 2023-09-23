import { Body, Post, Get, UseGuards, Controller, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
// import { AuthGuard } from './auth.guard';
import { Roles } from './roles.decorator';
import { UserRoles } from '../user/enums/user-roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req): Promise<any> {
        return this.authService.login(req.user as User);
    }
    
    // @Roles(UserRoles.ADMIN)
    // @UseGuards(RolesGuard)
    // @UseGuards(AuthGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get('user')
    getUser(@Request() req) {
        return req.user;
    }

}
