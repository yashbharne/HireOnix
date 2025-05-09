import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../core/services/JobService/job.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './JobForm.component.html',
  imports: [ReactiveFormsModule],
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup;
  isEditMode = false;
  jobId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.route.paramMap.subscribe((params) => {
      this.jobId = params.get('jobId');
      if (this.jobId) {
        this.isEditMode = true;
        this.loadJobData(this.jobId);
      }
    });
  }

  initializeForm() {
    this.jobForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(20)]],
      jobType: ['Full-time', Validators.required],
      location: ['', Validators.required],
      salaryMin: [0, [Validators.required, Validators.min(0)]],
      salaryMax: [0, [Validators.required, Validators.min(0)]],
      experience: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+\+? years?$/)],
      ],
      skills: ['', Validators.required], // Input as comma-separated string
    });
  }

  loadJobData(id: string) {
    this.jobService.getJobById(id).subscribe({
      next: (res: any) => {
        const job = res.job;
        this.jobForm.patchValue({
          title: job.title,
          description: job.description,
          jobType: job.jobType,
          location: job.location,
          salaryMin: job.salaryRange.min,
          salaryMax: job.salaryRange.max,
          experience: job.experience,
          skills: job.skills.join(', '),
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) return;

    const formValue = this.jobForm.value;

    const jobData = {
      title: formValue.title,
      description: formValue.description,
      jobType: formValue.jobType,
      location: formValue.location,
      salaryRange: {
        min: formValue.salaryMin,
        max: formValue.salaryMax,
      },
      experience: formValue.experience,
      skills: formValue.skills.split(',').map((s: string) => s.trim()), // Convert to array
    };

    if (this.isEditMode && this.jobId) {
      this.jobService.updateJob(this.jobId, jobData).subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      this.jobService.createJob(jobData).subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
