import { Field, InputType } from '@nestjs/graphql';

@InputType() // gql Input 타입
export class CreateBoardInputDto {
    @Field(() => String)
    writer: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    contents: string;
}
