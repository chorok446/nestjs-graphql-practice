import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductCategoryService } from './productCategory.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory])],
    providers: [
        ProductCategoryResolver, //import 옵션에 TypeOrmModule.forFeature([ProductCategory])을 추가해 주세요. TypeOrmModule.forFeature메서드는 엔티티를 전달합니다.
        ProductCategoryService,
    ],
})
export class ProductCategoryModule {}
