import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  salary: number;
  age: number;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7152/api/Employee';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  createEmployee(employee: Employee): Observable<string> {
    return this.http.post(this.apiUrl, employee, { responseType: 'text' });
  }

  deleteEmployee(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}?id=${id}`, { responseType: 'text' });
  }
}
