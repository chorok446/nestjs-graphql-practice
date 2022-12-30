import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { User } from '../users/entities/user.entity';
import { Module } from '@nestjs/common';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';

@Module({
    imports: [
        JwtModule.register({}), //
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        JwtRefreshStrategy,
        AuthResolver, //
        AuthService,
        UserService,
    ],
})
export class AuthModule {}
