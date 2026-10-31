import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Bill } from '../../models';

@Component({
  selector: 'app-bill',
  imports: [DatePipe],
  template: `
    <h2>Facture</h2>
    <div class="toolbar">
      <input type="number" [value]="billId" (change)="onIdChange($event)" />
      <button (click)="load()">Charger</button>
    </div>

    @if (bill) {
      <h3>
        Facture #{{ bill.id }} — {{ bill.customer?.name }}
        <span class="muted">{{ bill.billingDate | date: 'short' }}</span>
      </h3>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          @for (item of bill.productItems; track item.id) {
            <tr>
              <td>{{ item.product?.name }}</td>
              <td>{{ item.unitPrice }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.unitPrice * item.quantity }}</td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <p class="muted">Aucune facture chargée.</p>
    }
  `,
  styles: [
    '.toolbar { display: flex; gap: 8px; margin-bottom: 16px; }',
    '.muted { color: #64748b; font-weight: 400; font-size: 0.9rem; }'
  ]
})
export class BillComponent implements OnInit {
  billId = 1;
  bill: Bill | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  onIdChange(event: Event): void {
    this.billId = Number((event.target as HTMLInputElement).value);
  }

  load(): void {
    this.api.getBill(this.billId).subscribe((data) => (this.bill = data));
  }
}
