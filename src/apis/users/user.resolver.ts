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

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => String)
    fetchUser(
        @CurrentUser() currentUser: any, //
    ) {
        console.log('fetchUser 실행 완료!!!');
        console.log('유저정보는??!!!', currentUser);
        return 'fetchUser 실행 완료!!!';
    }
}
