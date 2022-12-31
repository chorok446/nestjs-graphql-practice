import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PointTransactionService } from './pointTransaction.service';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionResolver } from './pointTransaction.resolver';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([PointTransaction, User])],
    providers: [PointTransactionResolver, PointTransactionService],
})
export class PointTransactionModule {}
