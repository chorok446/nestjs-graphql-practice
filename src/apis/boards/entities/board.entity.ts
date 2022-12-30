import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Board {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int)
    number: number;

    @Column()
    @Field(() => String)
    writer: string;

    @Column()
    @Field(() => String)
    title: string;

    @Column()
    @Field(() => String)
    contents: string;
}

/*
`@Entity` : Board class가 실행될 때, typeorm에 의해 Entity 테이블을 만들어 줍니다.
`@PrimaryGeneratedColumn` : 자동으로 생성될 값의 컬럼입니다.
    - `increment` : 데이터가 한 줄씩 쌓일 때마다 자동으로 숫자가 1씩 증가하여 값이 생성됩니다.
    - `uuid` : 중복되지 않는 문자열 ID가 자동으로 생성됩니다.
- `@Column` : 표 형태에서 `열` 에 해당. 실제 들어갈 데이터의 값의 컬럼입니다.

- `Board` 클래스 위에 `@ObjectType()` **데코레이터를 추가하여 객체 형태의 GraphQL 타입으로** 바꿔주었습니다.
- `@Field()` 데코레이터를 추가하여 GraphQL Field 임을 알려주었고, 타입을 지정**해주었습니다.
    - TypeScript에서는 number 로 타입 지정
    - GraphQL에서는 Int 로 타입 지정
* */
