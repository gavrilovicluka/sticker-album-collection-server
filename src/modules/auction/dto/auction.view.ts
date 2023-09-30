import { BidView } from "src/modules/bid/dto/bid.view";
import { User } from "src/modules/user/user.entity";

export interface AuctionView {
    id: number;
    productName: string;
    startDate: Date;
    endDate: Date;
    basePrice: number;
    productDescription: string;
    productImage: string;
    user: User;
    bids: BidView[];
}