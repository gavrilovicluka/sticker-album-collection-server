import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig/*: JwtModuleAsyncOptions*/ = {

  secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  signOptions: { expiresIn: '1d' },
};