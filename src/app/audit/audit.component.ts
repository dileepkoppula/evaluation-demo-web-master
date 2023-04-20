import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { Audit } from "@/_models";
import { AuditService, AuthenticationService } from "@/_services";

@Component({ templateUrl: "audit.component.html" })
export class AuditComponent implements OnInit {
  user: any;
  audits = [];
  config:any;
  p: number = 1;
  key: string = "id";
  reverse: boolean = false;
  show12HrFormat: boolean = false;
  constructor(
    private authenticationService: AuthenticationService,
    private auditService: AuditService,
  ) {}


  ngOnInit() {
    this.loadAllAudits();
  }

  private loadAllAudits() {
    this.auditService
      .getAll()
      .pipe(first())
      .subscribe((audits) => (this.audits = audits));
  }

  search() {
    if (this.user == "") {
      this.ngOnInit();
    } else {
      this.audits = this.audits.filter((res) => {
        return res.user
          .toLocaleLowerCase()
          .match(this.user.toLocaleLowerCase());
      });
    }
  }

  
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  onChangeFormat(value){
    console.log(value);
    if(value=='12'){
      this.show12HrFormat=true;
    } else{
      this.show12HrFormat=false;
      
    }
  }

  onChangeItem(value) {
    console.log(value);
  }
}
