import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmOptions } from './db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging/logging.service';
import { LoggingModule } from './logging/logging.module';
import { ControllerLoggerMiddleware } from './logging/controller-logger.middleware';
import { LoggingExceptionFilter } from './logging/logging-exception.filter';


@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmOptions),
        UserModule,
        ArtistModule,
        TrackModule,
        AlbumModule,
        FavsModule,
        AuthModule,
        LoggingModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        LoggingService,
        { provide: APP_FILTER, useClass: LoggingExceptionFilter },
    ],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ControllerLoggerMiddleware).forRoutes('*');
    }
}
