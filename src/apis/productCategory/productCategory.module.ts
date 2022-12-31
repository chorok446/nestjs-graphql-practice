import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductCategoryService } from './productCategory.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategory])], // 엔티티 전달
    providers: [ProductCategoryResolver, ProductCategoryService],
})
export class ProductCategoryModule {}
