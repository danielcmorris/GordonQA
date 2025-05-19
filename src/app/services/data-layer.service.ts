import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of, tap } from "rxjs";
import { environment } from "../../environment/environment";
import { Command } from "../models/command";
import { Feature } from "../models/feature";

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  private commandServer = environment.commandServer;
  private sessionId: string = 'BDE97E06A85E9D9AB7FE82842C9BE85F6A4E7C3BB8C47DDA17AECCEF7F17ED91';


  private _features: any[] = [];
  features$ = new BehaviorSubject(this._features);

  private _featureTests: any[] = [];
  featureTests$ = new BehaviorSubject(this._featureTests);

  constructor(private http: HttpClient) {

  }

  getProjects() {
    return of([
      {
        projectID: 1,
        projectName: 'My Big Project',
        featureCount: 4,
        status: 'Active',
        templateCount: 12,
        testCount: 2
      }
    ])
  }
  
  clearFeatureTests() {
    this._featureTests = [];  
    this.featureTests$.next(this._featureTests);
  }
  setFeatureTests(tests: any[]) {
    this._featureTests = tests; 
    this.featureTests$.next(this._featureTests);
  }
  getTestsByFeatureId(id: number) {
    if(this._featureTests.length > 0) {
      return of(this._featureTests);
    }
    var cmd = new Command();
    cmd.procedure = 'cmdFeatureTests';
    cmd.addParameter('FeatureID', id);
    return this.command(cmd).pipe(
      tap((res: any) => {
      this.setFeatureTests(res);
      })
    )
  }
  getFeatures() {
    var cmd = new Command();
    cmd.procedure = 'cmdFeature';
    cmd.addParameter('FeatureID', 0);
    return this.command(cmd).pipe(
      tap((res: any) => {
        this._features = res;
        this.features$.next(this._features);
      })
    )
  }

  getFeatureById(id: number) {
    var cmd = new Command();
    cmd.procedure = 'cmdFeature';
    cmd.addParameter('FeatureID', id);
    return this.command(cmd)

  }

  
  saveFeature(f:Feature) { 
    var cmd = new Command();
    cmd.procedure = 'cmdFeatureSave';
    cmd.addParameter('FeatureID', f.featureID);
    cmd.addParameter('ProjectID', f.projectID);
    cmd.addParameter('Code', f.code);
    cmd.addParameter('FeatureName', f.featureName);
    cmd.addParameter('Description', f.description);
    cmd.addParameter('Status', f.status);
     return this.command(cmd)

  }
  command(commandObject: any): Observable<any> {

    let url: string = this.commandServer + '&tracker=' + commandObject.procedure + '&sid=' + this.sessionId;
    return this.http.post(url, commandObject)
      .pipe(map((res: any) => res));
    //  .do(x => console.log(x));
  }

}