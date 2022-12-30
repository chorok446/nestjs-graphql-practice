// updateProduct.input.ts

import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInput } from '../../productSaleslocation/dto/ProductSaleslocationInput';

@InputType()
export class UpdateProductInputDto {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Min(0)
    @Field(() => Int)
    price: number;

    @Field(() => ProductSaleslocationInput)
    productSaleslocation: ProductSaleslocationInput;
}
