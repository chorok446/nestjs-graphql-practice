import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtAccessStrategy } from '../auth/strategy/jwt-access.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        JwtAccessStrategy,
        UserResolver, //
        UserService,
    ],
})
export class UserModule {}
