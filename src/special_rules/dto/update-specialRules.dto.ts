import { IsNotEmpty, IsInt, IsEnum } from "@nestjs/class-validator";
import { GenderProduct } from "../entities/special_rules.entity";

export class UpdateSpecialRulesDto{
    @IsNotEmpty()
    @IsInt()
    max_person: number;

    @IsNotEmpty()
    @IsEnum(GenderProduct)
    gender: GenderProduct;

    @IsNotEmpty()
    general: string;
    
    

}