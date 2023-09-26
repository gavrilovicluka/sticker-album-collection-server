import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEditDto } from './dto/user-edit.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from './enums/user-roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get() 
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Roles(UserRoles.MEMBER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findById(@Param("id", ParseIntPipe) id: number): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Post('/register')
    doUserRegistration(@Body() userRegisterDto: UserRegisterDto) {
        return this.userService.doUserRegistration(userRegisterDto);
    }

    @Roles(UserRoles.MEMBER)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Put(":userId")
    public async updateUser(
        @Param("userId", ParseIntPipe) userId: number,
        @Body() dto: UserEditDto
    ) {
        return this.userService.update(userId, dto);
    }
}
