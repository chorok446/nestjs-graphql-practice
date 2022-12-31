// productSaleslocation.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Float, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class ProductSaleslocation {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    address: string;

    @Column()
    @Field(() => String)
    addressDetail: string;

    @Column()
    @Field(() => Float)
    lat: number;
    // 위도로 타입을 number로 작성
    @Column()
    @Field(() => Float)
    lng: number;
    //경도로 타입을 number로 작성
    @Column()
    @Field(() => Date)
    meetingTime: Date;
}
