<?php

    require 'gamedb.php';

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

        http_response_code(200);
        
        exit;
    }    

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $input = json_decode(file_get_contents('php://input'), true);

        if (isset($input['games']) && is_array($input['games'])) {

            $games = $input['games'];

            $sql_insert_tb_game = "INSERT INTO tb_game(cd_game,tx_name,tx_released,tx_pathimg,nr_rating,nr_metacritic) VALUES (:cd_game,:tx_name,:tx_released,:tx_pathimg,:nr_rating,:nr_metacritic)";
            $sql_insert_tb_genre = "INSERT INTO tb_genre(cd_genre,tx_description) VALUES (:cd_genre,:tx_description) ON DUPLICATE KEY UPDATE tx_description = VALUES(tx_description)";
            $sql_insert_tb_plataform = "INSERT INTO tb_plataform(cd_plataform,tx_name) VALUES (:cd_plataform,:tx_name) ON DUPLICATE KEY UPDATE tx_name = VALUES(tx_name)";
            
            $sql_insert_tb_game_genre = "INSERT INTO tb_game_genre(cd_game,cd_genre) VALUES (:cd_game,:cd_genre)";
            $sql_insert_tb_game_plataform = "INSERT INTO tb_game_plataform(cd_game,cd_plataform) VALUES (:cd_game,:cd_plataform)";

            $stmt_tb_game = $con -> prepare($sql_insert_tb_game);
            $stmt_tb_genre = $con -> prepare($sql_insert_tb_genre);
            $stmt_tb_plataform = $con -> prepare($sql_insert_tb_plataform);

            $stmt_tb_game_genre = $con -> prepare($sql_insert_tb_game_genre);
            $stmt_tb_game_plataform = $con -> prepare($sql_insert_tb_game_plataform);

            foreach ($games as $game) {

                if (isset($game['id'])) {

                    try {
                    
                        $cd_game = $game['id'];
                        $tx_name = $game['name'] ?? '';
                        $tx_released = $game['released'] ?? '';
                        $tx_pathimg = $game['background_image'] ?? '';
                        $nr_rating = $game['rating'] ?? '';
                        $nr_metacritic = $game['metacritic'] ?? '';
        
                        $stmt_tb_game->bindParam(':cd_game', $cd_game);
                        $stmt_tb_game->bindParam(':tx_name', $tx_name);
                        $stmt_tb_game->bindParam(':tx_released', $tx_released);
                        $stmt_tb_game->bindParam(':tx_pathimg', $tx_pathimg);
                        $stmt_tb_game->bindParam(':nr_rating', $nr_rating);
                        $stmt_tb_game->bindParam(':nr_metacritic', $nr_metacritic);
                        $stmt_tb_game -> execute();
    
                    } catch (Exception $e) {
    
                        continue;
                    }
                }                

                foreach ($game['genres'] as $genre) {

                    if (isset($genre['id'])) {

                        try {
                            
                            $cd_genre = $genre['id'];
                            $tx_description = $genre['name'];
        
                            $stmt_tb_genre->bindParam(':cd_genre', $cd_genre);
                            $stmt_tb_genre->bindParam(':tx_description', $tx_description);
                            $stmt_tb_genre -> execute();
        
                            $stmt_tb_game_genre->bindParam(':cd_game', $game['id']);
                            $stmt_tb_game_genre->bindParam(':cd_genre', $cd_genre);
                            $stmt_tb_game_genre -> execute();
    
                        } catch (Exception $e) {
    
                            continue;
                        }
                    }

                }

                foreach ($game['parent_platforms'] as $parent_platform) {

                    $plataform = $parent_platform['platform'];

                    if (isset($plataform['id'])) {

                        try {
    
                            $cd_plataform = $plataform['id'];
                            $tx_name = $plataform['name'];
        
                            $stmt_tb_plataform->bindParam(':cd_plataform', $cd_plataform);
                            $stmt_tb_plataform->bindParam(':tx_name', $tx_name);
                            $stmt_tb_plataform -> execute();
        
                            $stmt_tb_game_plataform->bindParam(':cd_game', $cd_game);
                            $stmt_tb_game_plataform->bindParam(':cd_plataform', $cd_plataform);
                            $stmt_tb_game_plataform -> execute();
    
                        } catch (Exception $e) {
    
                            continue;
                        }
                    }
                }
            }

            echo json_encode(["message" => "Games inserted successfully"]);
        
        } else {
        
            http_response_code(400);

            echo json_encode(["error" => "Invalid format"]);
        }
    } else {

        http_response_code(400);

        echo json_encode(["error" => "Method not allowed"]);
    }
?>