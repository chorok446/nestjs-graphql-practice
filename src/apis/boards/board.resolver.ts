import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createBoard.input.dto';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => [Board])
    fetchBoards() {
        return this.boardService.findAll();
    }

    @Mutation(() => String)
    createBoard(
        @Args('writer') writer: string,
        @Args('title') title: string,
        @Args('contents') contents: string,
        @Args('createBoardInput') createBoardInput: CreateBoardInput,
    ) {
        return this.boardService.create({
            writer,
            title,
            contents,
            createBoardInput,
        });
    }
}

/* - 
전달인자 서비스로 전달해주면 서비스에서 처리
`@Args` 는 데코레이터로 `'@nestjs/graphql'`에서 import하여 사용하는데 gql에 arguments라고 알려줍니다.
- 반환 메시지는 String 타입으로 반환되기 때문에 변경하지 않았습니다.
`@Arg()` 데코레이터를 사용해서 객체 value 값의 타입을 지정했습니다.
`@Arg()` 안은 gql 타입이고, 그 뒤는 타입스크립트의 타입을 의미합니다.
*/
