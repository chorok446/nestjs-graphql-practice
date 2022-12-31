import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../auth/gql/gql-auth.guard';
import { CurrentUser } from '../auth/gql/gql-user.param.decorator';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService, //
    ) {}

    @Mutation(() => User)
    async createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('name') name: string,
        @Args('age') age: number,
    ) {
        const hashedPassword = await bcrypt.hash(password, 10.2);
        console.log(hashedPassword);
        return this.userService.create({ email, hashedPassword, name, age });
    }

    @UseGuards(GqlAuthAccessGuard) // Guard를 통해서 인가 로그인 한 사람만 본인의 프로필을 조회할 수 있기에 로그인을 했는지 안 했는지 검증
    @Query(() => String)
    fetchUser(
        @CurrentUser() currentUser: any, //
    ) {
        console.log('fetchUser 실행 완료!!!');
        console.log('유저정보는??!!!', currentUser);
        return 'fetchUser 실행 완료!!!';
    }
}
