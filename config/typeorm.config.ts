import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/modules/user/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "sticker-album-collection",
  entities: [User],
  synchronize: true,
};
