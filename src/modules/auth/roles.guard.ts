import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector/*, private userService: UserService*/) {}

  // Reflector se koristi za citanje metapodataka o ruti
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());  //Dohvataju se uloge koje su definisane kao metapodaci na ruti
    const request = context.switchToHttp().getRequest();    //Dohvatanje trenutnog zahteva

    if (request?.user) {
      // const { id } = request.user;
      // const user = await this.userService.getUserById(id);
      // return roles.includes(user.role);
      return roles.includes(request.user.role);
    }

    return false;
  }
}