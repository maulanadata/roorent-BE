import { IsNotEmpty } from "class-validator";

export class CreateBanksDTO {
    @IsNotEmpty()
    user_id: string;

    @IsNotEmpty()
    bank_name: string;

    @IsNotEmpty()
    acc_name: string;

    @IsNotEmpty()
    acc_number: string;
}