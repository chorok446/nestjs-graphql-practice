// productCategory.resolver.ts

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Resolver()
export class ProductCategoryResolver {
    constructor(
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    @Mutation(() => ProductCategory)
    createProductCategory(
        @Args('name') name: string, //
    ) {
        return this.productCategoryService.create({ name });
    }
}

/*
- ductCategoryResolver 클래스에 생성자로 비즈니스 로직을 의존성 주입해 주었습니다.
- graphql의 `@Mutation` 을 사용해서 **return 받을 graphql의 결과 타입을 알려줍니다.**
- graphql의 `@Args` 을 사용해서 **받고 싶은 graphql의 인자 타입을 알려줍니다.**
- 의존성 주입을 해 놓은 비즈니스 로직의 create 메서드를 `this.productCategoryService.create()` 를 이용하여 연결시켜서 함수를 실행시켜 주었습니다.
- `async ~ await` : 비즈니스 로직에서 사용해 주었기에 함께 사용해 줍니다.
- `return` : 비즈니스 로직으로부터 받은 결과를 프론트 또는 사용자에게 돌려주게 되는 것입니다.



*/
