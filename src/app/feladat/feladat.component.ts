import { Component } from '@angular/core';

@Component({
  selector: 'app-feladat',
  templateUrl: './feladat.component.html',
  styleUrl: './feladat.component.css'
})
export class FeladatComponent {
  szam: number=0
  megoldasok: string[] = [];
  kiertekeles: string = '';
  hibauzenet: string = '';

  EredmenyMentese() {
    if (this.szam === null || isNaN(this.szam)) {
      this.hibauzenet = 'Kérem, adjon meg egy érvényes számot!';
      this.kiertekeles = '';
      return;
    } else {
      this.hibauzenet = '';
    }

    let PrimeE = true;
    if (this.szam <= 1) {
      PrimeE = false;
    } else {
      for (let i = 2; i < this.szam; i++) {
        if (this.szam % i === 0) {
          PrimeE = false;
        }
      }
    }
    this.kiertekeles = `A(z) ${this.szam} ${PrimeE ? 'prím' : 'NEM prím'}`;
    this.megoldasok.push(this.kiertekeles);
  }
}