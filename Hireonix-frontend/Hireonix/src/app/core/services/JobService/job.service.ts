import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private api: ApiService) {}

  getAllJobsOfRecruiter(): Observable<any> {
    return this.api.get('recruiter/getAllJobs');
  }

  createJob(jobpost: any): Observable<any> {
    return this.api.post('recruiter/create', jobpost);
  }

  updateJob(id: string, jobpost: any): Observable<any> {
    return this.api.patch(`recruiter/update/${id}`, jobpost);
  }

  getJobById(id: string): Observable<any> {
    return this.api.get(`recruiter/getJob/${id}`);
  }

  deleteJob(id: string): Observable<any> {
    return this.api.delete(`recruiter/delete/${id}`);
  }
}
