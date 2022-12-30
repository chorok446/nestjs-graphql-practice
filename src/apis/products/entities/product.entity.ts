// product.entity.ts

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSaleslocation } from '../../productSaleslocation/entities/productSalelocation.entity';
import { ProductCategory } from '../../productCategory/entities/productCategory.entity';

// GraphQL을 위한 `@ObjectType()`, `@Field` 추가

@Entity()
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    description: string;

    @Column()
    @Field(() => Int)
    price: number;

    @Column({ default: false })
    @Field(() => Boolean)
    isSoldout: boolean;

    @JoinColumn()
    @OneToOne(() => ProductSaleslocation)
    @Field(() => ProductSaleslocation)
    productSaleslocation: ProductSaleslocation;

    @ManyToOne(() => ProductCategory)
    @Field(() => ProductCategory)
    productCategory: ProductCategory;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @JoinTable()
    @ManyToMany(() => ProductTag, (productTags) => productTags.products)
    @Field(() => [ProductTag])
    productTags: ProductTag[];

    // @Column({ default: false })
    // @Field(() => Boolean)
    // isDeleted: boolean;

    // @Column({ nullable: true })
    // @Field(() => Date)
    // deletedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

/*
@Entity :  class가 실행될 때, typeorm에 의해 Entity 테이블을 만들어 줍니다.
@PrimaryGeneratedColumn(' ') : 자동으로 생성될 값의 컬럼입니다.
    - increment : 숫자로 데이터가 쌓일 때마다 **숫자가 하나하나씩 올라가는 PK 키를 만들 수 있습니다.
    - uuid ( = Universal Unique IDentifier ) : 중복되지 않는 고유한 PK 키를 만들 수 있습니다.
@Column({ type : ‘text’ }) : ERD에서 타입을 지정해 주었는데, 엔티티에서 타입을 원하는 대로 지정해 줄 수 있습니다. 정해주지 않으면( 빈 괄호로 둘 경우) default 값으로 들어가게 됩니다.
- boolean 타입을 만들 때는 컬럼명 앞에 is 를 붙여줘서 이름만 보고도 boolean 타입인 것을 알 수 있게 사용하는 경우가 많습니다.
- soldedAt : Date  : Date 타입으로 만들게 된다면 상품이 팔렸을때 날짜가 나타나게 되므로 컬럼 값이 비어있다면 아직 팔리지않은 isSoldout이 false 인 상태입니다.
    - Date 타입 일 경우, **팔렸을 때와 안 팔렸을 때를 true 와 false 로 구분할 수 있으며, 추가로 언제 판매가 되었는지 시간도 구분 할 수 있게 되므로 Date 타입을 사용 하게 됩니다.

@OneToOne() : 두 테이블의 관계를 나타내는 것으로 @OneToOne( ) 은 한쪽에만 쓰거나, 양쪽에 모두 써줄 수 있습니다. 여기서는 Product에만 써주겠습니다.
@JoinColumn() : 두 테이블을 하나로 합쳐서 데이터를 가져와야 하기에 사용하였으며, 한쪽 테이블에만 적어줘야 합니다.
- productSaleslocation 의 타입은 ProductSaleslocation class 자체이기에 import를 해왔습니다.

- `@ManyToOne()` : N : 1 관계를 나타내는 데코레이터입니다.
- `@JoinColumn()` : Many 부분에 해당하는 테이블(product)에서는 JoinColumn( ) 이 생략 가능합니다.
    - **@ManyToOne(** ) : @JoinColumn( ) **생략 가능**
    - **@OneToOne( )** : @JoinColumn( ) **반드시 필요**

- `@ManyToMany()` : N :M의 관계를 가질 때는 두 테이블 모두 컬럼을 추가하여 연결해 주어야 합니다.
- `(products) => products.productTags` :  products 입장에서의 productTags 와의 관계를 명시해 준 것으로, N : M 관계에서는 두 테이블 모두 관계를 나타내 주어야 합니다.
- `Product[]` : 하나의 태그에 상품이 여러 개 해당될 수 있기에 배열로 나타내는 것입니다.


-
- `isSoldOut`  컬럼은 판매 여부를 기록하는 컬럼이기에, 기본 **고정 값( default 값 )을  판매가 되지 않은 상태인 false로 지정하기 위해서 `@Column({ default: false })` 추가해 주었습니다.**
    - 데이터를 저장할 때 초기값을 false로 자동으로 등록하게 해줍니다.
- **typescript**에서는 배열 타입을 `ProductTag[]`로 작성해 주었지만,

    **grahql**에서는 배열 타입을 `[ProductTag]` 로 작성하게 됩니다.

 */
