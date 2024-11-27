<?php

    require 'gamedb.php';

    $sql = "
        SELECT 
            g.cd_game as id,
            g.tx_name as name,
            g.tx_released as released,
            g.tx_pathimg as background_image,
            g.nr_rating as rating,
            g.nr_metacritic as metacritic,
            ge.cd_genre as id_genre,
            ge.tx_description as description_genre,
            p.cd_plataform as id_plataform,
            p.tx_name as name_plataform
        FROM tb_game g
        LEFT JOIN tb_game_genre gg ON g.cd_game = gg.cd_game
        LEFT JOIN tb_genre ge ON gg.cd_genre = ge.cd_genre
        LEFT JOIN tb_game_plataform gp ON g.cd_game = gp.cd_game
        LEFT JOIN tb_plataform p ON gp.cd_plataform = p.cd_plataform
        ORDER BY g.cd_game
    ";

    $stmt = $con -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    $games = [];

    foreach ($result as $game) {

        $gameId = $game['id'];

        if (!isset($games[$gameId])) {

            $games[$gameId] = [
                "id" => $game['id'],
                "name" => $game['name'],
                "released" => $game['released'],
                "background_image" => $game['background_image'],
                "rating" => $game['rating'],
                "metacritic" => $game['metacritic'],
                "genres" => [],
                "parent_platforms" => []
            ];
        }

        if (isset($game['id_genre'])) {

            $genreExists = array_filter(
                $games[$gameId]['genres'],
                fn($genre) => $genre['id'] == $game['id_genre']
            );

            if (!$genreExists) {
                $games[$gameId]['genres'][] = [
                    "id" => $game['id_genre'],
                    "description" => $game['description_genre']
                ];
            }
        }

        if (isset($game['id_plataform'])) {

            $platformExists = array_filter(
                $games[$gameId]['parent_platforms'],
                fn($platform) => $platform['id'] == $game['id_plataform']
            );

            if (!$platformExists) {
                $games[$gameId]['parent_platforms'][] = [
                    "id" => $game['id_plataform'],
                    "name" => $game['name_plataform']
                ];
            }
        }
    }

    echo json_encode(array_values($games), JSON_PRETTY_PRINT);
?>