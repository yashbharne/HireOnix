import { Routes } from '@angular/router';
import { RecruiterComponent } from './recruiter.component';
import { JobComponent } from './job/job.component';
import { JobFormComponent } from './JobForm/JobForm.component';
import { JobDetailsComponent } from './JobDetails/JobDetails.component';
import { JobApplicationComponent } from './JobApplication/JobApplication.component';
import { ApplicationDetailsComponent } from './ApplicationDetails/ApplicationDetails.component';

export const recruiterRoutes: Routes = [
  {
    path: 'recruiter',
    component: RecruiterComponent,
    children: [
      { path: 'jobs', component: JobComponent },
      { path: 'createJob', component: JobFormComponent },
      { path: 'editJob/:jobId', component: JobFormComponent },
      { path: 'jobDetails/:jobId', component: JobDetailsComponent },
      { path: 'job/applications/:jobId', component: JobApplicationComponent },
      {
        path: 'application/candidate/:applicationId',
        component: ApplicationDetailsComponent,
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'jobs',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recruiter',
  },
];
