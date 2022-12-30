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

/*

- `constructor`를 사용하여 `Product 엔티티`를 비즈니스 로직에 **의존성주입을 해주었습니다.**
- 비즈니스 로직에서 데이터를 저장하는 방법은 두가지가 존재합니다.
    - 하나씩 나열해서 데이터를 저장하는 방법
    - 스프레드 문법을 사용해서 객체를 펼쳐서 데이터를 저장하는 방법 ( **코드 간결**의 장점 존재 )
- `async ~ await` : **SQL Query문으로 변환되어 DB로 들어가 저장될 때까지 기다려 줘야 하기에** async ~ await를 사용해 주었습니다.
- **등록된 상품 객체를** result 변수에 담아서 **브라우저에 다시 전달해 주기 위해서는 함수가 실행되는** `product.resolver.ts` **파일로 돌아가야 하기에** `return`**을 사용**해 주었습니다.


- **TypeOrm의 `findOne` 메서드를 사용해서 product 테이블에 매개변수로 받은 productId 에 해당하는 상품을 1개 조회**하는 비즈니스 로직을 추가합니다.
    - `{ where: { id: productId } }` : where을 통해 조회하고자 하는 조건을 적어주었습니다.
- `async ~ await` : findOne 이 이루어질 때까지 기다려 주셔야 합니다

- **TypeOrm의 `find` 메서드를 사용해서 product 테이블에 존재하는 모든 데이터를 조회**하는 비즈니스 로직을 추가했습니다.
- `async ~ await` : find 가 이루어질 때까지 기다려 주셔야 합니다.

- 타입스크립트의 인터페이스를 사용해서 데이터 수정에 필요한 요청 값의 타입의 유효성을 검사합니다.
- `this.productRepository.findOne` : 데이터를 수정하기 위해 DB에서 수정할 데이터를 찾아와야 합니다.
    - 내가 수정한 컬럼에 대해서만 조회할 때는 findOne을 해주지 않아도 되지만,

        수정한 컬럼을 포함한 해당 상품의 다른 컬럼들을 함께 조회할 때는 findOne을 통해서 데이터를 먼저 찾아와 주어야 합니다.

    - 즉, return 받는 값에 수정한 컬럼을 포함한 다른 컬럼들이 존재해야 한다면 findOne을 먼저 해주셔야 합니다.
- 비즈니스 로직에서 데이터를 수정하는 방법 또한 두 가지가 존재합니다.
    - 하나씩 나열해서 데이터를 수정하는 방법
    - 스프레드 문법을 사용해서 데이터를 수정하는 방법( 코드 간결 )
- `this.productRepository.save`
    - `.update` : **데이터를 수정할 때 사용**합니다.

    - `.save` : **데이터를 수정하고, 수정한 결과를 찾아오기까지** 합니다. 수정할 때 .save 를 사용하기 위해서는 먼저 데이터를 찾아와야지 사용 가능합니다.
- 우리는 데이터를 수정하고 무슨 데이터가 수정되었는지 프론트에게 알려주기 위해 `.save` 를 사용하였습니다.

- `checkSoldout` 함수를 `product.service.ts`에 추가 하였습니다.
    - `checkSoldout`는 상품이 판매가 되었는지 확인하는 비즈니스 로직입니다.
    - productRepository 에서 해당 product 데이터를 찾아온 뒤, 그 상품이 이미 판매가 된 상품이라면  `throw new UnprocessableEntityException` 을 통해 에러를 만들어서 프론트로 에러메세지를 전달한 것입니다. 반환된 상태 코드를 보면서 어떤 문제인지 알 수 있습니다.
        - NestJS에서 에러상태 코드가 합쳐져 있는 에러도 제공해 주고 있기에, `UnprocessableEntityException` 에러를 많이 사용합니다. (코드 간결해짐)
    - `throw new HttpException(에러메세지, 에러상태코드)` : 비즈니스 로직을 작성할 때 발생할 일들에 대해 예측할 수 있는 에러들, 기획에 맞지 않는 에러들이 발생하는 경우 **처리할 수 없음을 나타내는 에러**를 만들 때 사용 합니다.
    - 422 에러상태 코드 대신에, 조금 더 보기 쉽게 사용할 수 있도록 NestJS에서 제공해주는 `HttpStatus.UNPROCESSABLE_ENTITY` 을 사용해 주었습니다.

 */
