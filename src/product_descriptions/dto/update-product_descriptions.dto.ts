import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDescriptionsDTO } from "./create-product_descriptions.dto";

export class UpdateProductDescriptionsDTO extends PartialType(CreateProductDescriptionsDTO){}