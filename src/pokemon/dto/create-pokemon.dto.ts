import {IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";

export class CreatePokemonDto {

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    no: number;

    @IsNotEmpty()
    @IsString({})
    @Length(1, 40)
    name: string;
}
