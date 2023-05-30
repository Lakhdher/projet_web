import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CommonService } from './common.service';

@Module({
  imports: [UserModule],
  providers: [CommonService as any],
  exports: [CommonService],
})
export class CommonModule {}