import { Routes } from '@angular/router';
import { FeatureComponent } from './pages/feature/feature.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TestListComponent } from './pages/test-list/test-list.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { TemplateListComponent } from './pages/template-list/template-list.component';
import { TemplateDetailsComponent } from './pages/template-details/template-details.component';
import { TestDetailsComponent } from './pages/test-details/test-details.component';
import { FeatureListComponent } from './pages/feature-list/feature-list.component';

export const routes: Routes = [
   
    {path:"dashboard", component:DashboardComponent},
    {path:"features/:featureId", component:FeatureComponent},
    {path:"features/:featureId/templates/:templateId", component:TemplateDetailsComponent},
    {path:"features", component:FeatureListComponent},
    {path:"tests", component:TestListComponent},    
    {path:"tests:/id", component:TestDetailsComponent},
    {path:"projects", component:ProjectListComponent},
    {path:"projects/:id", component:ProjectComponent},
    {path:"projects/:id/features/:featureId", component:FeatureComponent},
    {path:"templates", component:TemplateListComponent},
    {path:"templates/:id", component:TemplateDetailsComponent},
    {path:"settings", component:FeatureComponent},
    {path:"",component:DashboardComponent}
];
