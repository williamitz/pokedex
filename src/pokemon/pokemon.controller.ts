import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from '../pipes/parse-mongo-id.pipe';
import { PaginationDTO } from '../common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async create(@Body() createPokemonDto: CreatePokemonDto) {
    return await this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll( @Query() queryParams: PaginationDTO ) {
    return this.pokemonService.findAll( queryParams );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pokemonService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return await this.pokemonService.update(id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
