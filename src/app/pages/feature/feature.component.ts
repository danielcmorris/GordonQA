import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
 import { DataLayerService } from '../../services/data-layer.service';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DisplayService } from '../../common/services/display.service';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, NgbDropdownModule],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss'
})
export class FeatureComponent {
   featureName: string = "Fancy Feature";

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

}
