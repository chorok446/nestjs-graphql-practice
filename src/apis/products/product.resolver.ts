import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { UpdateProductInputDto } from './dto/updateProduct.input.dto';
import { CreateProductInputDto } from './dto/createProduct.input.dto';

@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    // gql에서는 조회만 Query로 받을 수 잇음 나머지는 전부 Mutation
    @Query(() => [Product]) // 반환값 전부 가져오는 거 라서 배열 객체로 지정해줌
    fetchProducts() {
        return this.productService.findAll();
    }

    @Query(() => Product)
    fetchProduct(
        @Args('productId') productId: string, //
    ) {
        return this.productService.findOne({ productId });
    }

    @Mutation(() => Product)
    createProduct(
        @Args('createProductInput') createProductInput: CreateProductInputDto, // dto로 유효성 검사
    ) {
        return this.productService.create({ createProductInput });
    }

    // 수정을 할 때는 수정 결과를 통해 어떤 상품에서 어떤 부분이 수정이 되었는지 알려줄 수 있지만 삭제를 하면 Product가 남지 않음 따라서, @Mutation 의 return 값이 Product 였지만
    // 삭제를 하게 되면DB에서 삭제되어 없어지므로 return 값을 Product로 가지고 올 수 없기 때문에
    // 그 결과는 ‘삭제가 완료되었습니다' 의 `String` 이나 true, false 의 `Boolean` 값을 통해 성공여부만 알려주게됨
    @Mutation(() => Boolean)
    deleteProduct(@Args('productId') productId: string) {
        return this.productService.delete({ productId });
    }

    @Mutation(() => Product) // 어떤게 업데이트 되었는지 알아야하기 때문에 return값 Product로 지정
    async updateProduct(
        @Args('productId') productId: string,
        @Args('updateProductInput') updateProductInput: UpdateProductInputDto, // 인자 타입
    ) {
        // 판매 완료가 되었는지 확인해보기 만약 함수 실행중 에러 발생시 로직 중단되서 수정되지 않음
        await this.productService.checkSoldout({ productId });

        // 수정하기
        return await this.productService.update({
            productId,
            updateProductInput,
        });
    }
}
