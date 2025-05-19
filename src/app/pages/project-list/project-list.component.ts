 


import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ProjectListColumnDefinition } from './col-defs';
import { FormsModule } from '@angular/forms';

import { SideBarDef } from 'ag-grid-community';
import { DataLayerService } from '../../services/data-layer.service';
import { DisplayService } from '../../common/services/display.service';
import { firstValueFrom } from 'rxjs';


var sideBar: SideBarDef = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',

    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
    },

  ],
  defaultToolPanel: '',
}
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [RouterModule, AgGridAngular, FormsModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {


  rowData: any[] = []
  gridOptions: any = {}
  gridApi: any = null;

  quickFilter: any = '';

  showInactive: boolean = false;

  sampleData = [
    { projectID: 1, 
      projectName: 'My Big Project',
      featureCount: 4, 
      status: 'Active',  
      templateCount: 12, 
      testCount: 2 }
  ]


  constructor(private dl: DataLayerService, private router: Router, public display: DisplayService) {
    let gridOpts = new ProjectListColumnDefinition();
    this.gridOptions = gridOpts.gridOptions;
    this.gridOptions.sideBar = sideBar;

    this.rowData = this.sampleData;







  }





  onShowInactiveChanged($event: any) {
    console.log('show inactive', $event)
    this.showInactive = $event

    let status = this.showInactive ? 'Inactive' : 'Active';
    let filter = {
      status: {
        filterType: 'set',
        values: [status]
      }
    }



    this.gridApi.setFilterModel(filter);

    this.gridApi.refreshCells({ force: true });
    console.log('show inactive', this.showInactive)
  }

  onQuickFilterChanged() {

    this.gridApi.setQuickFilter(this.quickFilter);
    console.log('filter changed', this.quickFilter)

  }


  async onGridReady($event: any) {

    this.gridApi = $event.api;
    this.onShowInactiveChanged(false);
    this.gridApi.sizeColumnsToFit();
    console.log('start',this.rowData);
    this.rowData=[];
    this.loadData();
    console.log('end',this.rowData); 
  }
  async loadData() {
    this.rowData = await firstValueFrom(this.dl.getProjects());
    this.gridOptions.api.setRowData(this.rowData as any);

  }
  onAddEmployee() {
    this.router.navigate(['/features', 'new']);

  }
  onrowClicked($event: any) {
    console.log($event.data)
    console.log($event.data.featureID)
    this.router.navigate(['/projects', $event.data.projectID]);

  }


}
