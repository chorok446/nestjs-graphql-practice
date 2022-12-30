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

    @Column()
    @Field(() => Float)
    lng: number;

    @Column()
    @Field(() => Date)
    meetingTime: Date;
}

/*
`lat` : 위도로 타입을 number로 작성하였습니다.
`lng` : 경도로 타입을 number로 작성하였습니다.
`@Column({ type: 'timestamp' })` : 시간 관련한 데이터 timestamp 타입을 지정해 주었습니다.
- `Float type` : 소수점이 들어가는 숫자일 경우 사용합니다.
- `Date type` : 날짜 타입을 지정해 줄 때 사용합니다.

 */
