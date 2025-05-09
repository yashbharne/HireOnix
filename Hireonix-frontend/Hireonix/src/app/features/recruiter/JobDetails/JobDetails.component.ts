import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService } from '../../../core/services/JobService/job.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-JobDetails',
  templateUrl: './JobDetails.component.html',
  styleUrls: ['./JobDetails.component.css'],
  imports: [CommonModule,RouterLink],
})
export class JobDetailsComponent implements OnInit {
  jobId!: string;
  job: any;
  

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('jobId')!;
    this.fetchJobDetails();
  }

  fetchJobDetails() {
    this.jobService.getJobById(this.jobId).subscribe((res) => {
      
     

      this.job = res.job;
    });
  }
}
