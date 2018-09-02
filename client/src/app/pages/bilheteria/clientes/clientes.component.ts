import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'cons-usuarios',
  styleUrls: ['./clientes.component.scss'],
  templateUrl: './clientes.component.html',
  providers: [ClientesService]
})
export class ClientesComponent implements OnInit {

  constructor() {}
  
  ngOnInit() {
  }
}