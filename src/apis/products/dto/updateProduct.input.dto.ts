// updateProduct.input.ts

import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInputDto } from '../../productSaleslocation/dto/ProductSaleslocation.input.dto';

@InputType()
export class UpdateProductInputDto {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Min(0)
    @Field(() => Int)
    price: number;

    @Field(() => ProductSaleslocationInputDto)
    productSaleslocation: ProductSaleslocationInputDto;
}
