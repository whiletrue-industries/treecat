import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  selectedTreeId: string | null = null;

  constructor() { }
}
