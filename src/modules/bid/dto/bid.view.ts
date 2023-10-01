export interface BidView {
    id: number;
    bidPrice: number;
    bidTime: Date;
    bidUserId: number;
    bidUsername?: string;
    bidUserAddress?: string;
    bidUserPhoneNumber?: string;
    bidUserEmail?: string;
    auctionId?: number;
    productName?: string;
    productDescription?: string;
    endDate?: Date;
    won?: boolean
}