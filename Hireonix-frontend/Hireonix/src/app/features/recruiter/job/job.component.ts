import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { JobService } from '../../../core/services/JobService/job.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job',
  imports: [CommonModule, RouterLink],
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent {
  jobs: any[] = [];
  currentPage = signal(1);
  totalPages = signal(1);
  pageSize = 5;

  constructor(private jobService: JobService) {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getAllJobsOfRecruiter().subscribe({
      next: (res: any) => {
        console.log(res);
        this.jobs = res.jobs;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  changePage(delta: number) {
    const newPage = this.currentPage() + delta;
    if (newPage > 0 && newPage <= this.totalPages()) {
      this.currentPage.set(newPage);
      this.loadJobs();
    }
  }

  deleteJob(jobId: string) {
    if (jobId) {
      this.jobService.deleteJob(jobId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.loadJobs();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  viewApplicants(jobId: string) {
    // Navigate to applicants page
  }
}
