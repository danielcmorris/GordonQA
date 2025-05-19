import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { FeatureListColumnDefinition } from './col-defs';
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
  selector: 'app-feature-list',
  standalone: true,
  imports: [RouterModule, AgGridAngular, FormsModule],
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.scss'
})
export class FeatureListComponent {


  rowData: any[] = []
  gridOptions: any = {}
  gridApi: any = null;

  quickFilter: any = '';

  showInactive: boolean = false;

  sampleData = [
    { featureId: 1, featureName: "Test Feature 1", status: 'Active', projectName: 'My Big Project', templateCount: 12, testCount: 2 }
  ]


  constructor(private dl: DataLayerService, private router: Router, public display: DisplayService) {
    let gridOpts = new FeatureListColumnDefinition();
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
    this.rowData = await firstValueFrom(this.dl.getFeatures());
    this.gridOptions.api.setRowData(this.rowData as any);

  }
  onAddEmployee() {
    this.router.navigate(['/features', 'new']);

  }
  onrowClicked($event: any) {
    console.log($event.data)
    console.log($event.data.featureID)
    this.router.navigate(['/features', $event.data.featureID]);

  }


}
