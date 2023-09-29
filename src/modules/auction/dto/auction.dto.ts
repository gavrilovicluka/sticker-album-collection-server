import { IsNotEmpty } from "@nestjs/class-validator";

export class AuctionDto {

    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    basePrice: number;

    @IsNotEmpty()
    productDescription: string;
}