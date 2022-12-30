// createProduct.input.ts

import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInput } from '../../productSaleslocation/dto/ProductSaleslocationInput';

@InputType()
export class CreateProductInputDto {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Min(0)
    @Field(() => Int)
    price: number;

    @Field(() => ProductSaleslocationInput)
    productSaleslocation: ProductSaleslocationInput;

    @Field(() => String)
    productCategoryId: string;

    @Field(() => [String])
    productTags: string[];
}

// isSoldout의 dafault 값을 false로 설정하는 것은 입력값을 설정하는 InputType에서 정의할 수는 있지만,
// 판매가 완료되지 않은 기본값 설정을 하는 것이므로 entity에서 설정을 해주면 굳이 입력값을 주고받지 않아도 되어 더 효율적인 방법이 됨
