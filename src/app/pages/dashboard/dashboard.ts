import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  employees: Employee[] = [];
  isLoading = true;
  showAddModal = false;
  
  get canAdd(): boolean {
    return this.authService.getUserRole() === 'admin-add';
  }

  get canDelete(): boolean {
    return this.authService.getUserRole() === 'admin-delete';
  }

  get totalEmployees(): number {
    return this.employees.length;
  }

  get totalPayroll(): number {
    return this.employees.reduce((acc, emp) => acc + (emp.salary || 0), 0);
  }

  get averageSalary(): number {
    return this.totalEmployees > 0 ? this.totalPayroll / this.totalEmployees : 0;
  }

  get totalDepartments(): number {
    const depts = new Set(this.employees.map(emp => emp.department));
    return depts.size;
  }


  newEmployee: Employee = {
    name: '',
    email: '',
    phone: '',
    address: '',
    salary: 0,
    age: 0,
    department: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (!token) {
      this.logout();
      return;
    }
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employees', err);
        this.isLoading = false;
        if (err.status === 401) {
          this.logout();
        } else if (err.status === 403) {
          alert('Unauthorized: You do not have permission to view the employee list.');
        }
      }
    });
  }

  saveEmployee() {
    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (res) => {
        console.log(res);
        alert('Employee added successfully!');
        this.loadEmployees();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error adding employee', err);
        if (err.status === 403) {
          alert('Unauthorized: You do not have permission to add employees.');
        } else {
          alert('Failed to add employee. Please check your data.');
        }
      }
    });
  }

  deleteEmployee(id: number) {
    if (!this.canDelete) {
      alert('Unauthorized: Only users with the delete-admin role can delete employees.');
      return;
    }
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.employees = this.employees.filter(e => e.id !== id);
          alert('Employee deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting employee', err);
          if (err.status === 403) {
            alert('Unauthorized: You do not have permission to delete employees.');
          } else {
            alert('Failed to delete employee.');
          }
        }
      });
    }
  }

  openModal() {
    if (!this.canAdd) {
      alert('Unauthorized: Only users with the add-admin role can add employees.');
      return;
    }
    this.showAddModal = true;
  }

  closeModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  resetForm() {
    this.newEmployee = {
      name: '',
      email: '',
      phone: '',
      address: '',
      salary: 0,
      age: 0,
      department: ''
    };
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
