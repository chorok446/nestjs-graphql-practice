import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column()
    // @Field(() => String) 비밀번호 노출 금지!!
    password: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => Int)
    age: number;

    @Column({ default: 0 }) // 포인트 기본값 0
    @Field(() => Int)
    point: number;
}
