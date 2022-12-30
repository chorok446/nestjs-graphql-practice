import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSalelocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, ProductSaleslocation, ProductTag]),
    ], //  형식 TypeOrmModule.forFeature([Entity]) 추가,  TypeOrmModule.forFeature메서드는 엔티티를 전달 의존성을 주입해줘야만 사용가능
    providers: [
        ProductResolver, //
        ProductService,
    ],
})
export class ProductModule {}

//
