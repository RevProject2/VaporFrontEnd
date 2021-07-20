import { Game } from './Game';
import { User } from './User';

export interface Library {
  id: number;
  userId: User;
  gameId: Game;
}
