import { Genre } from "./Genre";
import { Plataform } from "./Plataform";

export type Game = {
    id: number;
    name: string;
    released: string;
    background_image: string;
    rating: number;
    metacritic: number;
    genres: Genre[];
    parent_platforms: Plataform[];
}