import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
    PAYMENT = 'PAYMENT',
    CANCEL = 'CANCEL',
}

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
    // enum을 gql 에서 쓰기위해 사용
    name: 'POINT_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class PointTransaction {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    impUid: string;

    @Column()
    @Field(() => Int)
    amount: number;

    @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM }) //  enum 타입 지정,  status컬럼에는 OINT_TRANSACTION_STATUS_ENUM의 값만 사용가능
    @Field(() => POINT_TRANSACTION_STATUS_ENUM)
    status: string;

    @ManyToOne(() => User) // 유저 한명당 여러번의 결제를 할 수 있기에 연결
    @Field(() => User)
    user: User;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;
}
