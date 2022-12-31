// productCategory.entity.ts

import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// gql은 데코레이터 사용시 스키마 자동으로 생성됨(code-first
@Entity()
@ObjectType() // 객체타입
export class ProductCategory {
    @PrimaryGeneratedColumn('uuid') // 자동생성되는 ID값 uuid: 유니크한 uuid 사용
    @Field(() => String) // gql 타입
    id: string;

    @Column({ unique: true })
    @Field(() => String)
    name: string;
}
