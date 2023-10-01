import { BidView } from "src/modules/bid/dto/bid.view";
import { User } from "src/modules/user/user.entity";

export interface AuctionListView {
    id: number;
    productName: string;
    productDescription: string;
    startDate: Date;
    endDate: Date;
    basePrice: number;
    productImage: string;
    topBid?: BidView;
}