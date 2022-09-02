import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IPokeResponse } from 'src/interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { AxiosAdapter } from '../common/axios-adapter';

@Injectable()
export class SeedService {


  constructor(
    @InjectModel(Pokemon.name) private readonly _pokemodel: Model<Pokemon>,
    private _adapter: AxiosAdapter
  ) {}

  async findAll() {

    let { results } = await this._adapter.get<IPokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
    
    results.forEach( async ( { name, url } ) => {

      let segments = url.split('/');

      let no = +segments[ segments.length - 2 ];

      await this._pokemodel.create({
        name,
        no
      });

    });

    return 'Seed executed!';
  }

}
