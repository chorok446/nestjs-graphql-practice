import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { User } from '../users/entities/user.entity';
import { Module } from '@nestjs/common';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { JwtGoogleStrategy } from './strategy/jwt-social-google.strategy';

@Module({
    imports: [
        JwtModule.register({}), //
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        JwtGoogleStrategy,
        JwtRefreshStrategy,
        AuthResolver, //
        AuthService,
        UserService,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
