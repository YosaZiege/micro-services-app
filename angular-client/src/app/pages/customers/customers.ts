import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Customer } from '../../models';

@Component({
  selector: 'app-customers',
  imports: [],
  template: `
    <h2>Clients</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        @for (c of customers; track c.id) {
          <tr>
            <td>{{ c.id }}</td>
            <td>{{ c.name }}</td>
            <td>{{ c.email }}</td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class Customers implements OnInit {
  customers: Customer[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCustomers().subscribe((data) => (this.customers = data));
  }
}
