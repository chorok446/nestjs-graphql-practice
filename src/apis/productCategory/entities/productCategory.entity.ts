// productCategory.entity.ts

import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductCategory {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({ unique: true })
    @Field(() => String)
    name: string;
}

// - `@ObjectType()` , `@Field(() => String)` 추가했습니다. 이 데코레이터들은 **graphql 에게** 무슨 타입인지 알려주는 역할을 합니다.
// - 데코레이터 사용으로 스키마가 자동으로 생성( code-first 방식 ) 되게 됩니다.
// - import를 어디서 했는지 확인하면 좀 더 쉽게 이해할 수 있습니다.
// - `@Column({ unique: true })` 옵션 값을 추가에 유일한 값으로 지정합니다.
// - 유일한 값으로 지정하게 되면, 동일한 이름을 사용할 수 없게 됩니다.
