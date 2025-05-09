import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(private apiService: ApiService) { }

  getAllApplicationsOfTheJob(jobId: string): Observable<any> {
    return this.apiService.get(`application/jobs/${jobId}`);
  }

  getApplicationDetails(applicationId: string): Observable<any> {
    return this.apiService.get(`application/${applicationId}`);
  }

  changeStatus(applicationId: string, status:string): Observable<any> {
    return this.apiService.patch(`application/${applicationId}/status`, {status})
  }
}

