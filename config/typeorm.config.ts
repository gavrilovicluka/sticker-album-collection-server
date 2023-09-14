import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Publisher } from "src/modules/publisher/publisher.entity";
import { User } from "src/modules/user/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "sticker-album-collection",
  entities: [User, Publisher],
  synchronize: true,
};
