import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-excption.filter';

// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.use(graphqlUploadExpress());
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3000);
}

bootstrap();

/*
최종적으로 실행시켜주는 파일은 `main.ts` 파일 내에 존재하는 app 부분이기에,

app.useGlobalPipes 사용해서 **ValidationPipe를 연결시켜 줘야함

`Pipe`는 **데이터가 오고가는 흐름에 있어서 데이터 검증과 필터링을 해주는 역할을 합니다.

따라서, price 가격에 음수 값을 넣게되면 BAD_USER_INPUT error가 발생하면서 API 요청이 이루어지지 않습니다.


*/
