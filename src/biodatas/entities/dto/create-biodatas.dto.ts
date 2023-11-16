import { IsDate, IsNotEmpty } from "class-validator";

export class CreateBiodatasDTO{
    @IsNotEmpty()
    nik: string;
    
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    birth_date: Date;

    @IsNotEmpty()
    photo_profile: string;

    @IsNotEmpty()
    telephone: string;
    
    @IsNotEmpty()
    photo_ktp: string;

    @IsNotEmpty()
    address: string;

}
