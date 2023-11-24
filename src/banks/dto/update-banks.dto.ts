import { IsNotEmpty } from "class-validator";

export class UpdateBanksDTO {
    @IsNotEmpty()
    bank_name: string;

    @IsNotEmpty()
    acc_name: string;

    @IsNotEmpty()
    acc_number: string;
}