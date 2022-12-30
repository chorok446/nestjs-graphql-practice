import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async findAll() {
        return await this.productRepository.find();
    }

    async findOne({ productId }) {
        return await this.productRepository.findOne({
            where: { id: productId },
        });
    }

    async create({ createProductInput }) {
        const result = await this.productRepository.save({
            ...createProductInput,

            // 하나하나 직접 나열하는 방식
            // name: createProductInput.name,
            // description: createProductInput.description,
            // price: createProductInput.price,
        });
        return result;
    }

    async update({ productId, updateProductInput }) {
        const myproduct = await this.productRepository.findOne({
            where: { id: productId },
        });

        const newProduct = {
            ...myproduct,
            id: productId,
            ...updateProductInput,
        };

        return await this.productRepository.save(newProduct);
    }

    async delete({ productId }) {
        // 1. 실제 삭제
        // 넘겨받은 productId와 DB에 존재하는 product의 Id가 일치하는 데이터를 삭제
        // 삭제의 결과는 객체로 나오는데, result 변수에 담아서 삭제가 제대로 이루어졌는지 확인하기 위해 .affected 를 사용해 줌 삭제가 이루어진 게 있다면 true 를 프론트로 리턴 아니면 false를 리턴
        //const result = await this.productRepository.delete({ id: productId });
        //return result.affected ? true : false;

        // 2. 소프트 삭제(직접 구현) - isDeleted
        // await this.productRepository.update({ id: productId }, { isDeleted: true });

        // 3. 소프트 삭제(직접 구현) - deletedAt;
        // await this.productRepository.update({ id: productId }, { deletedAt: new Date() }); // 시간이 있으면 삭제된걸로 간주

        // 4. 소프트 삭제(TypeORM 제공) - softRemove
        // await this.productRepository.softRemove({ id: productId }); // id로만 삭제 가능

        // 5. 소프트 삭제(TypeORM 제공) - softDelete
        const result = await this.productRepository.softDelete({
            id: productId,
        });
        return result.affected ? true : false;
    }

    async checkSoldout({ productId }) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });

        if (product.isSoldout)
            throw new UnprocessableEntityException(
                '이미 판매 완료된 상품입니다.',
            );

        // if (product.isSoldout) {
        //   throw new HttpException(
        //     '이미 판매 완료된 상품입니다.',
        //     HttpStatus.UNPROCESSABLE_ENTITY,
        //   );
        // }
    }
}
