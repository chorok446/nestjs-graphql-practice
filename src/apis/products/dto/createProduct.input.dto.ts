// createProduct.input.ts

import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Min(0)
    @Field(() => Int)
    price: number;
}

// - **입력**을 할 때 필요하기에 `InputType` 을 사용하는 것입니다.
// - **리턴** 받는 `ObjectType` 을 사용하시게 되면 **에러가 발생**합니다.
// - `price` : Type을 `int(정수)` 로 설정해 주었는데, 가격에서는 **음수 값이 나올 수 없기 때문에 최솟값 설정**`(Min(0))`을 해주었습니다.
// - 해당 설정을 위해선 `class-validator` , `class-transformer` **라이브러리 설치가 필요**합니다.
// isSoldout의 dafault 값을 false로 설정하는 것은 입력값을 설정하는 InputType에서 정의할 수는 있지만, 판매가 완료되지 않은 기본값 설정을 하는 것이므로 entity에서 설정을 해주시면 굳이 입력값을 주고받지 않아도 되어 더 효율적인 방법이 됩니다.
