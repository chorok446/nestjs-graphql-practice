import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [
        ProductResolver, //
        ProductService,
    ],
})
export class ProductModule {}

// import 옵션에 TypeOrmModule.forFeature([Product])을 추가해 주세요. TypeOrmModule.forFeature메서드는 엔티티를 전달합니다.
