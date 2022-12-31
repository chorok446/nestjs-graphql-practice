import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Entity 테이블 정의
@ObjectType() //객체 형태의 GraphQL 타입
export class Board {
    @PrimaryGeneratedColumn('increment') // 자동생성 컬럼  `increment` : 데이터가 한 줄씩 쌓일 때마다 자동으로 숫자가 1씩 증가하여 값이 생성 - `uuid` : 중복되지 않는 문자열 ID가 자동으로 생성
    @Field(() => Int) // GraphQL Field정의 및 타입 지정 , TypeScript에서는 number 로 타입 지정 , GraphQL에서는 Int 로 타입 지정
    number: number;

    @Column() // 컬럼 정의
    @Field(() => String)
    writer: string;

    @Column()
    @Field(() => String)
    title: string;

    @Column()
    @Field(() => String)
    contents: string;
}
