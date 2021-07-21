import { Component, OnInit } from '@angular/core';
import { PurchaseHistory } from 'src/app/Classes/PurchaseHistory';
import { User } from 'src/app/Classes/User';
import { UserService } from 'src/app/services/user.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css'],
  providers: [UserComponent],
})
export class PurchaseHistoryComponent implements OnInit {
  user: User = null;
  games: PurchaseHistory[];
  purchaseHistory: PurchaseHistory = {
    id: 0,
    userId: {
      id: 0,
      username: '',
      password: '',
      first: '',
      last: '',
      balance: 0,
    },
    gameId: {
      name: '',
      id: 0,
      genre: '',
      price: 0,
      img: '',
    },
    p_date: '',
  };

  date: string;

  constructor(private us: UserService) {}

  ngOnInit(): void {
    this.getUser();
    this.getUserPurchaseHistory();
  }

  getUser() {
    this.user = JSON.parse(document.cookie);
  }

  getUserPurchaseHistory() {
    this.us.getPurchaseHistory(this.user.id).subscribe((games) => {
      this.games = games;
      for (let i = 0; i < this.games.length; i++) {
        let game = this.games[i];
        this.date = game.p_date;
        this.date.split('').reverse().join('');
        console.log(this.date);
      }
    });
  }
}
