import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../../app.setings';

@Injectable()

export class ClientesService {

    constructor(private http: HttpClient) {}
    
}
