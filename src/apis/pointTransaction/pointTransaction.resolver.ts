import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { PointTransaction } from './entities/pointTransaction.entity';
import { GqlAuthAccessGuard } from '../auth/gql/gql-auth.guard';
import {
    CurrentUser,
    ICurrentUser,
} from '../auth/gql/gql-user.param.decorator';
import { PointTransactionService } from './pointTransaction.service';

@Resolver()
export class PointTransactionResolver {
    constructor(
        private readonly pointTransactionService: PointTransactionService,
    ) {}

    @UseGuards(GqlAuthAccessGuard) // 로그인한 사람만 결제가능
    @Mutation(() => PointTransaction)
    createPointTransaction(
        @Args('impUid') impUid: string,
        @Args('amount') amount: number,
        @CurrentUser() currentUser: ICurrentUser,
        // 프론트엔드에서 impUid와 충전 금액인 amount, 가드를 이용해서 어떤 유저인지 받아와서 이것들을 서비스의 create 함수로 넘겨줌
    ) {
        return this.pointTransactionService.create({
            impUid,
            amount,
            currentUser,
        });
    }
}
