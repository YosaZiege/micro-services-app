import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models';

@Component({
  selector: 'app-products',
  imports: [],
  template: `
    <h2>Produits</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prix</th>
          <th>Quantité</th>
        </tr>
      </thead>
      <tbody>
        @for (p of products; track p.id) {
          <tr>
            <td>{{ p.id }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.price }}</td>
            <td>{{ p.quantity }}</td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class Products implements OnInit {
  products: Product[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe((data) => (this.products = data));
  }
}
