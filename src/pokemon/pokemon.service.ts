import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { ConfigService } from '@nestjs/config';
import { PaginationDTO } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  private _limit: number;

  constructor(
    @InjectModel(Pokemon.name) private _pokemonmodel: Model<Pokemon>,
    private readonly _env: ConfigService
  ) {
    
    this._limit = this._env.get('limit_default');

  }

  async create(pokemonDto: CreatePokemonDto) {
    
    try {
      const newPokemon = await this._pokemonmodel.create(pokemonDto);
      return newPokemon;
    } catch (error) {

      if(error.code == 11000) 
        throw new BadRequestException(`pokemon exists in db ${JSON.stringify(error.keyValue)} `);

      throw new InternalServerErrorException('Can´t create pokemon - check logs');
    }

  }

  async findAll( { page = 1, limit = this._limit }: PaginationDTO ) {
    
    let skip = ( page - 1 ) * limit;

    return await this._pokemonmodel.find()
    .skip( skip )
    .limit( limit )
    .select('-__v');
  }

  async findOne(id: string) {

    let pokemon: Pokemon; // = await this._pokemonmodel.findOne({ $or: [ {no: id, _id: id, name: id.toLowerCase()} ] });
    // buscando en una sola línea

    

    if(  !isNaN(+id)) {
      pokemon = await this._pokemonmodel.findOne({ no: id });
    } else if( isValidObjectId(id) ) {
      pokemon = await this._pokemonmodel.findOne({ _id: id }); 
    } else {
      pokemon = await this._pokemonmodel.findOne({ name: id.toLowerCase() }); 
    }
    
    if(!pokemon) throw new NotFoundException(`Not found pokemon by id, name or no ${id}`);

    return pokemon;
  }

  async update(id: string, pokemonDto: UpdatePokemonDto) {

    try {
      const pokeUpdate = await this._pokemonmodel.findByIdAndUpdate(id, pokemonDto, {new: true});
    
    if(!pokeUpdate) throw new NotFoundException('Not found pokemon by id');

      return pokeUpdate;
    } catch (error) {
      if(error.code == 11000) 
        throw new BadRequestException(`pokemon exists in db ${JSON.stringify(error.keyValue)} `);

      throw new InternalServerErrorException('Can´t update pokemon - check logs');
    }
  }

  async remove(id: string) {
    
    let { deletedCount } = await this._pokemonmodel.deleteOne({ _id: id });

    if( deletedCount == 0 ) 
      throw new BadRequestException( `Pokemon with id ${ id } not found` );

    return `This action removes a #${id} pokemon`;
  }
}
