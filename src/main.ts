import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/http-excption.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe()); // 추가
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3000);
}

bootstrap();

/*
최종적으로 실행시켜주는 파일은 `main.ts` 파일 내에 존재하는 app 부분이기에,

`app.useGlobalPipes`를 사용해여 **ValidationPipe를 연결**시켜 주셔야 합니다.

`Pipe`는 **데이터가 오고가는 흐름에 있어서 데이터 검증과 필터링을 해주는 역할을 합니다.

따라서, price 가격에 음수 값을 넣게되면 BAD_USER_INPUT error가 발생하면서 API 요청이 이루어지지 않습니다.


*/
