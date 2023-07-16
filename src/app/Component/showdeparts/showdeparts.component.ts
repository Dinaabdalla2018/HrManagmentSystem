import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/Services/Department/department.service';
import { EmployeeService } from 'src/app/Services/Employee/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-showdeparts',
  templateUrl: './showdeparts.component.html',
  styleUrls: []

})
export class ShowdepartsComponent {
  Departments:any;
  searchTerm:string;
  OriginDepartments:any;
  result:any;

  constructor(private departmentService:DepartmentService,
              private employeeService:EmployeeService,
              private router:Router){}
  ngOnInit(){
 this.departmentService.getAllDepartments().subscribe({
      next: (result) => { this.Departments=result; this.OriginDepartments=result;
      },
      error: (err) => { console.log(err.err); }
    });
}

search(){
   if(this.OriginDepartments!=this.Departments){
    this.Departments=this.OriginDepartments;
   }
    if (!this.Departments) {
      return [];
    }
    if (!this.searchTerm) {
      return this.Departments;
    }
    const keyword = this.searchTerm.toLowerCase();
    this.Departments=this.Departments.filter((item:any) => {
      return item.name.toLowerCase().includes(keyword);
    });

  }


DeleteDepartment(department:any,e:Event){
  e.preventDefault();
  Swal.fire({
    title: 'Are you sure you want to delete this annual vacation?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      this.employeeService.getEmpBydept(department.id).subscribe({
        next: (res) => {
         this.result=res
         if(this.result.message=="Yes"){
          console.log("yes");

          this.router.navigate(['/mDept',department.id]);
         }
         else{
        department.isDeleted=true;
        this.departmentService.editDepartment(department).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Department Deleted',
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
          },
          error: (e) => { }
        });

      }

        },
        error: (e) => { }
      });


    }
  })


}
}
