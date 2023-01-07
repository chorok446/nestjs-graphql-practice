import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/boards/board.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        BoardModule,
        ConfigModule.forRoot({
            isGlobal: true, // 전체적으로 사용하기 위해
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        PointTransactionModule,
        ProductCategoryModule,
        ProductModule,
        // FileModule,
        UserModule,
        AuthModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({ req, res }) => ({ req, res }),
        }),
        TypeOrmModule.forRoot({
            type: 'mysql', // 데이터 베이스 타입
            host: process.env.DB_HOST, // local 환경으로 진행
            port: process.env.DB_PORT, // mysql은 기본 port는 3306
            username: process.env.DB_USERNAME, // mysql은 기본 user는 root로 지정
            password: process.env.DB_PASSWORD, // 본인의 mysql password
            database: process.env.DB_NAME, // 연결할 데이터 베이스명
            entities: [__dirname + '/apis/**/*.entity.*'], //   데이터 베이스와 연결할 entity,  EX) entities: [Board] 이렇게 넣어도 됨
            synchronize: true, // entity 테이블을 데이터베이스와 동기화할 것인지
            logging: true, // 콘솔 창에 log를 표시할 것인지
        }),
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            url: process.env.REDIS_URL,
            isGlobal: true,
        }),
    ],
})
export class AppModule {}
