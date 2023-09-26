import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username);

        if (!user) {
            throw new UnauthorizedException('Ne postoji korisnik sa unetim korisnickim imenom');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Netacna lozinka!');
        }

        return user;
    }

    async login(user: User): Promise<any> {

        if (user) {
            const payload = {
                sub: user.id,
                username: user.username,
                role: user.role
            };
            return {
                token: this.jwtService.sign(payload)
            }
        } else {
            return {
                token: ''
            }
        }
    }


}
