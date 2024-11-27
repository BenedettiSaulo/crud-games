import { Button, Card, CardBody, CardFooter, CardImg, CardTitle, ListGroup } from "react-bootstrap";
import { Game } from "../types/Game";

type GameCard = {
    game: Game;
    onDelete: () => void;
    onEdit: () => void;
}

export function GameCard({ game, onDelete, onEdit }: GameCard) {
    return (
        <>
            <Card className="game-card">
                <CardImg className="game-card-img" variant="top" src={game.background_image} alt="Game image"></CardImg>
                <CardBody>
                    <CardTitle>{game.name}</CardTitle>
                    <ListGroup>
                        <ListGroup.Item>{game.genres.map(g => g.description).join(', ')}</ListGroup.Item>
                        <ListGroup.Item>{game.released}</ListGroup.Item>
                        <ListGroup.Item>{game.metacritic}</ListGroup.Item>
                        <ListGroup.Item>{game.rating}</ListGroup.Item>
                        <ListGroup.Item>{game.parent_platforms.map(pp => pp.name).join(', ')}</ListGroup.Item>
                    </ListGroup>
                </CardBody>
                <CardFooter className="game-card-btns">
                    <Button onClick={onEdit}>Edit</Button>
                    <Button onClick={onDelete}>Delete</Button>
                </CardFooter>
            </Card>
        </>
    );
}