import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Game } from "./types/Game";

import './styles/App.css'
import { getListGames, getListGamesDataBase, setListGamesDataBase, deleteGame, updateGame, createGame, deleteDataBase, insertLog } from './services/GameService'
import { useEffect } from 'react'
import { Button, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { GameCard } from './components/GameCard';
import { AccordionLogs } from './components/AccordionLogs';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {

        const gamesFromAPI = await getListGames();

        await insertLog(gamesFromAPI.length)

        const message = await setListGamesDataBase(gamesFromAPI);

        console.log(message);

        const gamesFromDataBase = await getListGamesDataBase();

        setGames(gamesFromDataBase);
        setLoading(false);

      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

    fetchGames();
  }, []);

  const handleDelete = async (gameId: number | null) => {
    if (!gameId) {
      return;
    }

    try {
      await deleteGame(gameId);
      setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
    } catch (error) {
      console.error(`Erro ao excluir jogo: ${error}`);
    }
  };

  const handleEdit = (game: Game) => {
    setIsEditing(true)
    setSelectedGame(game);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    if (selectedGame) {
      try {
        await updateGame(selectedGame);
        setGames((prevGames) =>
          prevGames.map((game) =>
            game.id === selectedGame.id ? { ...selectedGame } : game
          )
        );
        setShowModal(false);
      } catch (error) {
        console.error(`Erro ao atualizar jogo: ${error}`);
      }
    }
  };

  const handleOpenFormForCreate = () => {

    setIsEditing(false);

    setSelectedGame({
      id: 0,
      name: "",
      released: "",
      background_image: "",
      rating: 0,
      metacritic: 0,
      genres: [],
      parent_platforms: [],
    });
    setShowModal(true);
  };

  const handleDeleteDataBase = async () => {
    try {
      await deleteDataBase();
      setGames([]);
    } catch (error) {
      console.error(`Erro ao excluir jogo: ${error}`);
    }
  }

  const handleCreateGame = async () => {

    if (!selectedGame) {

      return;
    }

    try {
      const response = await createGame(selectedGame);

      if (response) {
        setGames((prevGames) => [...prevGames, selectedGame]);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="container-main">
        <main>
          <div className='btn-settings'>
            <Button className='btn-add' variant="success" onClick={() => handleOpenFormForCreate()}>Add game</Button>
            <Button variant="danger" onClick={() => handleDeleteDataBase()}>Delete database</Button>
          </div>
          <Container fluid>
            <Row className="g-3">
              {
                games.map((game: Game) => (
                  <Col key={game.id} xl={2} md={4} sm={6} xs={12}>
                    <GameCard
                      game={game}
                      onDelete={() => handleDelete(game.id)}
                      onEdit={() => handleEdit(game)}
                    />
                  </Col>
                ))
              }
            </Row>
          </Container>
        </main>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGame && (
            <Form>
              <Form.Group className="mb-3" controlId="gameID">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedGame.id}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, id: parseFloat(e.target.value) })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="gameName">
                <Form.Label>Path Image</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedGame.background_image}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, background_image: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="gameName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedGame.name}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="gameGenres">
                <Form.Label>Genres</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedGame.genres.map((genre) => genre.description).join(", ")}
                  onChange={(e) => {
                    const genreNames = e.target.value.split(", ").map((name) => name.trim());

                    const updatedGenres = genreNames.map((name, index) => ({
                      id: index + 1,
                      description: name
                    }));

                    setSelectedGame({
                      ...selectedGame,
                      genres: updatedGenres
                    });
                  }}
                />
                <Form.Text className="text-muted">
                  Separate genres with a comma. Example: *Action, Adventure, RPG*.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="gameName">
                <Form.Label>Released</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedGame.released}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, released: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="gameRating">
                <Form.Label>Metacritic</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedGame.metacritic}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, metacritic: parseFloat(e.target.value) })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="gameRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedGame.rating}
                  onChange={(e) =>
                    setSelectedGame({ ...selectedGame, rating: parseFloat(e.target.value) })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="gamePlatforms">
                <Form.Label>Plataforms</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedGame.parent_platforms.map((platform) => platform.name).join(", ")}
                  onChange={(e) => {
                    const platformNames = e.target.value.split(", ").map((name) => name.trim());
                    const updatedPlatforms = platformNames.map((name, index) => ({
                      id: index + 1,
                      name: name
                    }));

                    setSelectedGame({
                      ...selectedGame,
                      parent_platforms: updatedPlatforms
                    });
                  }}
                />
                <Form.Text className="text-muted">
                  Separate platforms with a comma. Example: *PC, PlayStation, Xbox*.
                </Form.Text>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isEditing ? (
            <>
              <Button variant="danger" onClick={() => handleDelete(selectedGame?.id ?? null)}>
                Delete
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Save
              </Button>
            </>
          ) : (
            <Button variant="success" onClick={handleCreateGame}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <AccordionLogs />
      <Footer />
    </>
  )
}

export default App
