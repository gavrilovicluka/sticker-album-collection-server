import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Album } from "src/modules/album/album.entity";
import { Auction } from "src/modules/auction/auction.entity";
import { Bid } from "src/modules/bid/bid.entity";
import { Publisher } from "src/modules/publisher/publisher.entity";
import { UserAlbum } from "src/modules/user-album/user-album.entity";
import { User } from "src/modules/user/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "sticker-album-collection",
  entities: [User, Publisher, Album, UserAlbum, Auction, Bid],
  synchronize: true,
};
