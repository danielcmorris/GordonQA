import { Component, inject, Input, signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
 import { DataLayerService } from '../../services/data-layer.service';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DisplayService } from '../../common/services/display.service';
import { ITestItem } from '../../models/test-item.interface';

@Component({
  selector: 'app-template-details',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, NgbDropdownModule],
  templateUrl: './template-details.component.html',
  styleUrl: './template-details.component.scss'
})
export class TemplateDetailsComponent {
  testName:string = "Form Stability"

   featureName: string = "Fancy Feature";
  
    tmpItem:ITestItem = {templateItemID:0,sortOrder:0,description:"",expectation:""}

    steps: ITestItem[]=[
      {templateItemID:1, sortOrder:1, description: "Login as User with correct credentials", expectation:"You will see the dashboard and your profile name will be displayed on the top right"},
      {templateItemID:2, sortOrder:2, description: "Open warehouse list and choose 'new warehouse", expectation:"You will see a blank warehouse form"},
      {templateItemID:3, sortOrder:3, description: "type in Warehouse Code: 01, Name : 'Test Warehouse', Region: Select region 5 from dropdown. Hit save and refresh", expectation:"All fields should maintain their values"},
      {templateItemID:4, sortOrder:4, description: "Click the 'back to list' button.", expectation:"You should be returned to the warehouse list and the new warehouse should be there"}
    ]

     templates=[
      {testTemplateID:132, templateName:"Form Stability", description:"Ensuring all form values save and update", steps: 17, version:"3.2.1",status:'Active'},
      {testTemplateID:223, templateName:"Form Validation", description:"Make sure form cannot be saved without required fields", steps: 6, version:"3.2.1",status:'Active'},
      {testTemplateID:432, templateName:"Admin Secure", description:"Check to make sure admin only fields are only visibe to admin", steps: 12, version:"3.2.1",status:'Active'},
      {testTemplateID:346, templateName:"Warnings", description:"Make sure users are alerted to deactivation and deletions", steps: 8, version:"3.2.1",status:'Active'},
      {testTemplateID:928, templateName:"Form Cancel", description:"Check to make sure hitting cancel resets form values", steps: 4, version:"3.2.1",status:'Active'},
     ]
  
  
  
    /* forms */
    form = new FormGroup({
      featureId: new FormControl(0),
      featureName: new FormControl('Fancy Feature'),
      description: new FormControl('This is a super fancy feature we are building'),
      code: new FormControl('FF'),
      fax: new FormControl(''),
      phone: new FormControl(''),
      manager: new FormControl(''),
      groupid: new FormControl(0),
      status: new FormControl('Active'),
      create_date: new FormControl(new Date()),
      sort_order: new FormControl(0),
      region_id: new FormControl(0),
      company_id: new FormControl('Active'),
      create_by_id: new FormControl(0),
    });
  
  
    step = new FormGroup({
      templateItemID: new FormControl(0),
      description: new FormControl(""),
      expectation: new FormControl(""),
      sortOrder: new FormControl(0)

    })

    @Input() id?: string;
   
    constructor(private dl: DataLayerService, private router:Router, public display:DisplayService ) {
   
    }

    
  goto(item:any){
    this.router.navigateByUrl(`/features/${this.id}/templates/${item.testTemplateID}`);
  }
  btnSave() { 
    let data:any = this.form.value  ;
 
  }
  onSetActive() {
    let c = confirm('Are you sure you want to reactivate this feature');
    if(c){
      this.form.controls['status'].setValue('Active');
      this.btnSave();
    }
   }
  onSetInactive() { 
    let c = confirm('Are you sure you want to deactivate this feature');
    if(c){
      this.form.controls['status'].setValue('Inactive');
      this.btnSave();
    }
  }
  onDelete() {
    let c = confirm('Are you sure you want to delete this feature');
    if(c){
      this.form.controls['status'].setValue('Deleted');
      this.btnSave();
    }
   }
  onSubmit() { }

  

  //MODAL

  modalTitle="New Step";
  private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');

	open(content: TemplateRef<any>, item:ITestItem) {
    if(item.templateItemID ==0 ){
      this.modalTitle="New Step";
      this.step.controls.sortOrder.setValue(this.steps.length+1);
    } else {
      this.modalTitle="Step " + item.sortOrder;
      this.step.controls.sortOrder.setValue(item.sortOrder ?? 0);
    }
   
    this.step.controls.description.setValue(item.description ?? "");
    this.step.controls.expectation.setValue(item.expectation ?? "");
    this.step.controls.templateItemID.setValue(item.templateItemID ?? 0);

    
    
		this.modalService.open(content, {size:'lg', ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
        if(result == 'Save'){
          
          item.sortOrder = this.step.controls.sortOrder.value ?? 0;
          item.description = this.step.controls.description.value ?? '';
          item.expectation = this.step.controls.expectation.value ?? '';
          if(item.templateItemID==0){
            item.templateItemID = new Date().getTime();
            this.steps.push(item);
          }
        }
        if(result == 'Delete'){
          this.steps = this.steps.filter(s=>s.templateItemID != item.templateItemID);
        }
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  
}
