import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// 컬럼값이 필수적이지 않을 때는 ? 를 붙여주면 해당 컬럼값이 있을 수도 있고 없을 수도 있는 컬럼이 됨
export interface ICurrentUser {
    id?: string;
    email: string;
    name?: string;
    password?: string;
    age?: number;
}

export const CurrentUser = createParamDecorator(
    (data, context: ExecutionContext): ICurrentUser => {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    },
);
