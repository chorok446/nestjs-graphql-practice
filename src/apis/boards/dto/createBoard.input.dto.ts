import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
    @Field(() => String)
    writer: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    contents: string;
}

//@InputType()를 사용하여 gql 에게 “이건 InputType 이야" 라고 알려줍니다.
