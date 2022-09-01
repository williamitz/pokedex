import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosInstance } from 'axios';

import { IPokeResponse } from 'src/interfaces/poke-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  private readonly _axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name) private readonly _pokemodel: Model<Pokemon>
  ) {}

  async findAll() {

    let { data } = await this._axios.get<IPokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
    
    data.results.forEach( async ( { name, url } ) => {

      let segments = url.split('/');

      let no = +segments[ segments.length - 2 ];

      // console.log( name, no );

      await this._pokemodel.create({
        name,
        no
      });

    });

    return 'Seed executed!';
  }

}
