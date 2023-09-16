import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEditDto } from './dto/user-edit.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get() 
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    findById(@Param("id", ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    @Post('/register')
    doUserRegistration(@Body() userRegisterDto: UserRegisterDto) {
        return this.userService.doUserRegistration(userRegisterDto);
    }

    @Put(":userId")
    public async updatUser(
        @Param("userId", ParseIntPipe) userId: number,
        @Body() dto: UserEditDto
    ) {
        return this.userService.update(userId, dto);
    }
}
