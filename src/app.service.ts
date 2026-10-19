import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return { name: 'Meeting Rooms API', status: 'running' };
  }
}
