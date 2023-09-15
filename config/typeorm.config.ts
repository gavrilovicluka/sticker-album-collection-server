import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Album } from "src/modules/album/album.entity";
import { Publisher } from "src/modules/publisher/publisher.entity";
import { User } from "src/modules/user/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "sticker-album-collection",
  entities: [User, Publisher, Album],
  synchronize: true,
};
