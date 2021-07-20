import { Game } from './Game';
import { User } from './User';

export interface Cart {
  id: number;
  userId: User;
  gameId: Game;
}
