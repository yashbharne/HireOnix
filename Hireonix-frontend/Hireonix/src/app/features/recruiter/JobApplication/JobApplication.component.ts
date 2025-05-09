import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApplicationsService } from '../../../core/services/JobApplicationService/applications.service';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-JobApplication',
  templateUrl: './JobApplication.component.html',
  styleUrls: ['./JobApplication.component.css'],
  imports: [TitleCasePipe,DatePipe,CommonModule, RouterLink],
})
export class JobApplicationComponent implements OnInit {
  jobId!: string;
  applications: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationsService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('jobId')!;
    this.fetchApplications();
  }

  fetchApplications() {
    this.applicationService.getAllApplicationsOfTheJob(this.jobId).subscribe({
      next: (res: any) => {
        this.applications=res.applications
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
