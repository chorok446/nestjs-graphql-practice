import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository: Repository<ProductCategory>,
    ) {}

    async create({ name }) {
        const result = await this.productCategoryRepository.save({ name });
        console.log(result); // { name: "전자제품" }

        return result;
    }
}

/*

- ProductCategoryService 클래스에 생성자에서 Repository를 **의존성 주입**해 줍니다.
- `@InjectRepository` 를 사용해서 생성자를 주입합니다.
- `private`으로 생성자를 선언하게 되면 인스턴스 생성이 불가능하게 됩니다. 즉 외부에서 접근이 불가능하게 해줌으로써, **사용한 클래스 내부에서만 수정이 가능**하고 **외부에서는 수정이 불가능** 하여 **안전**하게 사용 가능합니다.
- `readonly` 를 통해 생성자를 선언하면 선언 당시 또는 생성자에서 초기화된 후 값이 변경되지 않습니다. 따라서 readonly까지 작성하게 되면 **클래스 내부에서도 수정이 불가능**해집니다.
- `Repository<ProductCategory>` 는 productCategory 테이블과 비즈니스 로직을 연동시켜 주는 역할을 합니다.
- `this.productCategoryRepository.save`
    - `.create` : 데이터 한 줄 등록 합니다.
    - `.save` :  데이터를 한 줄 등록하고, 입력한 결과를 찾아오기 까지 합니다.
    - 우리는 데이터를 한 줄 등록하고 무슨 데이터가 등록되었는지 알려주기 위해 `.save` 를 사용하였습니다.
- `async ~ await` : 등록( 데이터가 저장 )이 잘 이루어졌다고 응답이 올 때 까지 기다려줘야하기에 사용 합니다.
- `return` :  `productCategory.resolver.ts` 의 `this.productCategoryService.create()` 로  등록한 데이터 객체를 return 해주게 된 것입니다.





*/
