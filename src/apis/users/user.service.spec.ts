import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

class MockRepository {
    async findOne(email) {
        const user: User = new User();
        user.email = email;
        return user;
    }
}

describe('UserService', () => {
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: MockRepository,
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('이메일값 있으면 찾아서 json값으로 리턴', async () => {
        const email = 'example@example.com';
        const result = await userService.findOneByEmail({ email });
        expect(result.email).toStrictEqual({ email });
    });
});
