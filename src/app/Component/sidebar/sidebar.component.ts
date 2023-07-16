import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { GroupService } from 'src/app/Services/Group/Group.service';
import { AuthenticationService } from 'src/app/Services/Identity/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  isLoginRoute = false;
  groupId:number;
  pages:string[]=[];
  results:any;
  constructor(
    private router: Router,
    private auth:AuthenticationService,
    private groupservice:GroupService) {
    router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isLoginRoute = event.url === '/login';
      }
    });

  }


  ngOnInit(): void
  {


    this.auth.decodedToken();
    this.groupId = this.auth.getGroupIdFromToken();
    this.groupservice.getByID(this.groupId).subscribe({
      next:(result)=>{
        this.results= result;
        for (let index = 0; index < this.results.length; index++) {
          this.pages.push(this.results[index].page.name);
        }
      },
      error:(err)=>{console.log(err);
      }
    });

  }
  isAccess(page_name:string){
    return this.pages.includes(page_name);
  }

}

