import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSalelocation.entity';

@InputType()
export class ProductSaleslocationInputDto extends OmitType(
    ProductSaleslocation,
    ['id'],
    InputType,
) {
    // 수동으로 할시
    // @Field(() => String)
    // address: string;
    // ...
    // => 위처럼 모두 적어야 하지만, PickType 또는 OmitType을 활용하여 타입 재사용
    // ObjectType에만 사용가능 inputType끼리는 못함
}
