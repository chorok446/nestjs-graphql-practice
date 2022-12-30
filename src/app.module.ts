import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/boards/board.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        BoardModule,
        ConfigModule.forRoot({
            isGlobal: true, // 전체적으로 사용하기 위해
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        ProductCategoryModule,
        ProductModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
        }),
        TypeOrmModule.forRoot({
            type: 'mysql', // 데이터 베이스 타입
            host: process.env.DB_HOST, // local 환경으로 진행
            port: process.env.DB_PORT, // mysql은 기본 port는 3306
            username: process.env.DB_USERNAME, // mysql은 기본 user는 root로 지정
            password: process.env.DB_PASSWORD, // 본인의 mysql password
            database: process.env.DB_NAME, // 연결할 데이터 베이스명
            entities: [__dirname + '/apis/**/*.entity.*'], //   데이터 베이스와 연결할 entity EX) entities: [Board] 이런식으로 넣어도 되나 많이 넣을시엔 지금 방식처럼 경로 확장자 방식이 나음
            synchronize: true, // entity 테이블을 데이터베이스와 동기화할 것인지
            logging: true, // 콘솔 창에 log를 표시할 것인지
        }),
    ],
})
export class AppModule {}
