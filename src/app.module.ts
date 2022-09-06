import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './common/config/env.config';
import { EnvValidation } from './common/config/env.joi';

@Module({
  imports: [

    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: EnvValidation
    }),

    ServeStaticModule.forRoot({
      rootPath: join( __dirname, '../public' )
    }),
    
    MongooseModule.forRoot( process.env.MONGO_URI ),
    
    PokemonModule,
    SeedModule,
    CommonModule,
    
  ],
})
export class AppModule {

  static port: number;

  constructor( private readonly _env: ConfigService ) {
    AppModule.port = this._env.getOrThrow('port');
  }

}
