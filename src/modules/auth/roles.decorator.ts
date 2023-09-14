import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Postavlja metapodatke na rute ili kontrolere da bi definisao uloge korisnika koji imaju pristup tim rutama/kontrolerima