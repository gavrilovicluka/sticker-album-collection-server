import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(username: string, password: string) {
        const user = await this.userService.getUserByUsername(username);
        
        if (!user) throw new BadRequestException('Ne postoji korisnik sa unetim korisnickim imenom');

        const match = await bcrypt.compare(password, user.password);
        
        if (!match)
            throw new BadRequestException('Netacna lozinka!');

        const payload = { sub: user.id, username: user.username, role: user.role };

        return {
            // user: {
            //     name: user.name,
            //     surname: user.surname,
            //     username: user.username,
            //     email: user.email,
            //     address: user.address,
            //     phoneNumber: user.phoneNumber
            // },
            token: await this.jwtService.signAsync(payload),
        };
    }

    // async validateUserCreds(username: string, password: string): Promise<any> {
    //     const user = await this.userService.getUserByUsername(username);

    //     if (!user) throw new BadRequestException('Ne postoji korisnik sa unetim korisnickim imenom');

    //     if (!(await bcrypt.compare(password, user.password)))
    //         throw new BadRequestException('Netacna lozinka!');

    //     return user;
    // }

    generateToken(user: any) {
        return {
            access_token: this.jwtService.sign({
                name: user.name,
                sub: user.id,
                role: user.role
            }),
        };
    }

}
