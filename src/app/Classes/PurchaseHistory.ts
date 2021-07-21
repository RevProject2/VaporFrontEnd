import { Game } from './Game';
import { User } from './User';

export interface PurchaseHistory {
  id: number;
  userId: User;
  gameId: Game;
  p_date: string;
}
