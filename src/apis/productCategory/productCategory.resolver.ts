// productCategory.resolver.ts

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Resolver()
export class ProductCategoryResolver {
    constructor(
        private readonly productCategoryService: ProductCategoryService,
    ) {}

    @Mutation(() => ProductCategory) //return 받을 결과값의 타입
    createProductCategory(
        @Args('name') name: string, // Graphql 인자 타입
    ) {
        return this.productCategoryService.create({ name });
    }
}
