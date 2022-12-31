import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { CreateBoardInputDto } from './dto/createBoard.input.dto';
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
        @Args('writer') writer: string, //  gql arguments 정의

        @Args('title') title: string, // `@Arg()` 안은 gql 타입, 그 뒤는 타입스크립트의 타입
        @Args('contents') contents: string,
        @Args('createBoardInput') createBoardInput: CreateBoardInputDto,
    ) {
        // - 반환 메시지는 String 타입으로 반환되기 때문에 변경안함
        // 전달인자 서비스로 전달해주면 서비스에서 처리
        return this.boardService.create({
            writer,
            title,
            contents,
            createBoardInput,
        });
    }
}
