import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductTag {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    // @ManyToMany() N :M의 관계를 가질 때는 두 테이블 모두 컬럼을 추가하여 연결해 주어야 함
    // (products) => products.productTags` :  products 입장에서의 productTags 와의 관계를 명시해 준 것으로, N : M 관계에서는 두 테이블 모두 관계를 나타내 주어야 함
    @ManyToMany(() => Product, (products) => products.productTags)
    @Field(() => [Product])
    products: Product[];
    // 하나의 태그에 상품이 여러 개 해당될 수 있기에 배열로 나타냄
}
