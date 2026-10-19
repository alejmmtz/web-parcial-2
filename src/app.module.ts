import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST') ?? 'localhost',
        port: Number(config.get<string>('DB_PORT') ?? 5436),
        username: config.get<string>('DB_USERNAME') ?? 'postgres',
        password: config.get<string>('DB_PASSWORD') ?? 'postgres',
        database: config.get<string>('DB_DATABASE') ?? 'reservations_exam',
        autoLoadEntities: true,
        // Only for the disposable local examination database.
        synchronize: config.get<string>('DB_SYNC') !== 'false',
      }),
    }),
    RoomsModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
