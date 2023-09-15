import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    async getAllUsers(): Promise<User[]> {
        return this.repo.find();
    }

    async getUserById(id: number): Promise<User> {
        return this.repo.findOneBy({ id });
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        return this.repo.findOne({ where: { username } });
    }

    async doUserRegistration(userRegisterDto: UserRegisterDto): Promise<User> {

        const existingUser = await this.repo.findOne({
            where: { username: userRegisterDto.username },
        });

        if (existingUser) {
            throw new BadRequestException('Korisničko ime već postoji.');
        }

        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(userRegisterDto.password, salt);

        const user = new User();
        user.name = userRegisterDto.name;
        user.surname = userRegisterDto.surname;
        user.username = userRegisterDto.username;
        user.email = userRegisterDto.email;
        user.password = password;
        user.address = userRegisterDto.address;
        user.phoneNumber = userRegisterDto.phoneNumber;

        return this.repo.save(user);
    }
}