import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategory) // 리포지토리 의존성 주입 readonly 쓰면 class내에서 수정불가
        private readonly productCategoryRepository: Repository<ProductCategory>,
    ) {}

    async create({ name }) {
        const result = await this.productCategoryRepository.save({ name });
        console.log(result); // { name: "전자제품" }

        return result;
    }
}
