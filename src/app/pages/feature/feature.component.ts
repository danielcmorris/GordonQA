import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataLayerService } from '../../services/data-layer.service';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DisplayService } from '../../common/services/display.service';
import { Feature } from '../../models/feature';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, NgbDropdownModule],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss'
})
export class FeatureComponent {
  private returnTo = '/features';

  featureName: string = "";

  templates = [
    { testTemplateID: 132, templateName: "Warehouse Form - Add New", description: "Ensuring all form values save and update", steps: 17, version: "3.2.1", status: 'Active' },
    { testTemplateID: 223, templateName: "Form Validation", description: "Make sure form cannot be saved without required fields", steps: 6, version: "3.2.1", status: 'Active' },
    { testTemplateID: 432, templateName: "Admin Secure", description: "Check to make sure admin only fields are only visibe to admin", steps: 12, version: "3.2.1", status: 'Active' },
    { testTemplateID: 346, templateName: "Warnings", description: "Make sure users are alerted to deactivation and deletions", steps: 8, version: "3.2.1", status: 'Active' },
    { testTemplateID: 928, templateName: "Form Cancel", description: "Check to make sure hitting cancel resets form values", steps: 4, version: "3.2.1", status: 'Active' },
  ]


  tests$:BehaviorSubject<any> = new BehaviorSubject<any[]>([]);


  /* forms */
  form = new FormGroup({
    featureID: new FormControl(0),
    featureName: new FormControl(''),
    description: new FormControl(''),
    code: new FormControl(''),
    status: new FormControl('Active'),
    createdDate: new FormControl(new Date()),
    sortOrder: new FormControl(0),
    projectID: new FormControl(0),
  });


  @Input('featureId') id?: string;

  constructor(private dl: DataLayerService, private router: Router, public display: DisplayService) {

  }


  async ngOnInit() {
    if (this.id?.toLocaleLowerCase() == 'new') {
    } else {
      let id = parseFloat(this.id || '0');
      this.loadData(id);
      await this.dl.getTestsByFeatureId(id);
      this.tests$ = this.dl.featureTests$;
    }

  }

  loadData(id: number) {
    this.dl.getFeatureById(id).subscribe((res: any) => {
      res[0].projectID = !res[0].projectID ? 0 : res[0].projectID;

      this.form.patchValue(res[0]);
      this.featureName = res[0].featureName;
    });
    this.dl.getTestsByFeatureId(id).subscribe((res: any) => {
      console.log('loadData', res);
      this.templates = res;
    });
  }

  goto(item: any) {
    this.router.navigateByUrl(`/features/${this.id}/templates/${item.testTemplateID}`);
  }
  btnSave() {
    let data: any = this.form.value;
    console.log('btnSave', data);
    this.dl.saveFeature(data).subscribe((res: Feature[]) => {
      console.log('btnSave', res);
      if (res[0].status == 'Active') {
        //  this.display.showSuccess('Feature saved successfully');
        this.router.navigateByUrl(`/features/${res[0].featureID}`, { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });
      } 
      if (res[0].status == 'Deleted' || res[0].status == 'Inactive') {
        //  this.display.showSuccess('Feature saved successfully');
        this.router.navigateByUrl(`${this.returnTo}` );
      } 
    });
  }
  onSetActive() {
    let c = confirm('Are you sure you want to reactivate this feature');
    if (c) {
      this.form.controls['status'].setValue('Active');
      this.btnSave();
    }
  }
  onSetInactive() {
    let c = confirm('Are you sure you want to deactivate this feature');
    if (c) {
      this.form.controls['status'].setValue('Inactive');
      this.btnSave();
    }
  }
  onDelete() {
    let c = confirm('Are you sure you want to delete this feature');
    if (c) {
      this.form.controls['status'].setValue('Deleted');
      this.btnSave();
    }
  }
  onSubmit() { }

}
