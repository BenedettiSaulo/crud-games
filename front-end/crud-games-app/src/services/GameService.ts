import axios from "axios";
import { Game } from "../types/Game";

const api = axios.create({
    baseURL: 'http://localhost:80/gamedb',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export async function getListGames() {
    const response = await axios.get("https://api.rawg.io/api/games?key=cd865ed95e11486d80976fe50b13bc5e");

    return response.data.results;
}

export async function setListGamesDataBase(games: Game[]) {
    const response = await api.post("/insert_games", { games });

    return response.data;
}

export async function getListGamesDataBase() {
    const response = await api.get('/get_games.php');

    return response.data;
}

export async function deleteGame(gameId: number) {
    const response = await api.delete(`/delete_game?codgame=${gameId}`);

    return response.data;
}

export async function updateGame(game: Game) {
    const response = await api.post('/update_game', game);

    return response.data;
}

export async function createGame(game: Game) {
    const response = await api.post('/create_game', game);

    return response.data;
}
