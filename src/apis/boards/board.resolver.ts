import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { CreateBoardInputDto } from './dto/createBoard.input.dto';

@Resolver()
export class BoardResolver {
    constructor(
        private readonly boardService: BoardService,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {}

    // @Query(() => String)
    // getHello() {
    //   return this.boardService.aaa();
    // }

    @Query(() => [Board])
    fetchBoards() {
        return this.boardService.findAll();
    }

    @Mutation(() => String)
    async createBoard(
        @Args({ name: 'writer', nullable: true }) writer: string,
        @Args('title') title: string,
        @Args('contents') contents: string,
        @Args('createBoardInput') createBoardInput: CreateBoardInputDto,
    ) {
        // 1. 캐시에 등록하는 연습
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await this.cacheManager.set('aaa', createBoardInput, {
            ttl: 0,
        });

        // 2. 캐시에서 조회하는 연습
        const mycache = await this.cacheManager.get('aaa');
        console.log(mycache);

        return '캐시 테스트';
        // 레디스 연습
        // console.log(args);
        // console.log(writer);
        // console.log(title);
        // console.log(contents);
        // console.log(createBoardInput);
        // return this.boardService.create();
    }
}
