import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataLayerService } from '../../services/data-layer.service';
import { Router, RouterModule } from '@angular/router';
import { DisplayService } from '../../common/services/display.service';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule, NgbDropdownModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  projectName = "Project Name";
  projectDescription = "Project Description";

  features = [
    { featureID: 1, featureName: "Dashboard", description: "This is a super fancy feature we are building", testCount: 12, status: 'Active' },
    { featureID: 2, featureName: "Job List", description: "This is a super fancy feature we are building", testCount: 12, status: 'Active' },
    { featureID: 3, featureName: "Job Page", description: "This is a super fancy feature we are building", testCount: 12, status: 'Active' },
    { featureID: 4, featureName: "Job Product Manager", description: "This is a super fancy feature we are building", testCount: 12, status: 'Active' }]



  /* forms */
  form = new FormGroup({
    companyID: new FormControl(0),
    projectID: new FormControl(0),
    code: new FormControl('P1'),
    projectName: new FormControl('Big Project 1'),
    description: new FormControl('This is a big project'),

    sort_order: new FormControl(0),
    status: new FormControl('Active'),
    create_date: new FormControl(new Date()),



    create_by_id: new FormControl(0),
  });



  @Input() id?: string;

  constructor(private dl: DataLayerService, private router: Router, public display: DisplayService) {

  }

  ngOnInit() {
    let id = parseFloat(this.id || '0');  
    this.loadData(id);
  }
  loadData(id: number) {
  
      this.dl.getFeatures().subscribe((res: any) => {
        console.log('loadData', res);
        this.features = res;
         
      });
     
  }
  goto(item: any) {
    console.log('goto', item);
    this.router.navigate(['features', item.featureID]);
  }
  onSubmit() { }
  onSetActive() { }
  onSetInactive() { }
  onDelete() { }
  btnSave() { }
}
