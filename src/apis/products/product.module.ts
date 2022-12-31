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
    ],
    //  TypeOrmModule.forFeature([Entity]) 추가하는 방식으로,
    // TypeOrmModule.forFeature메서드는 엔티티를 전달
    // 모듈에서 정의 해주지 않으면 의존성을 주입해줘도 서비스에서 사용하지 못함
    providers: [
        ProductResolver, //
        ProductService,
    ],
})
export class ProductModule {}
