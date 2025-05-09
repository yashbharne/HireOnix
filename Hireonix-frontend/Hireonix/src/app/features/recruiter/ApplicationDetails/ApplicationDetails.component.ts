import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicationsService } from '../../../core/services/JobApplicationService/applications.service';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-ApplicationDetails',
  templateUrl: './ApplicationDetails.component.html',
  styleUrls: ['./ApplicationDetails.component.css'],
  imports: [ReactiveFormsModule, DatePipe, TitleCasePipe],
})
export class ApplicationDetailsComponent implements OnInit {
  application: any;
  statusOptions = ['pending', 'shortlisted', 'rejected'];
  interviewForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private appService: ApplicationsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const applicationId = this.route.snapshot.paramMap.get('applicationId')!;
    this.fetchApplication(applicationId);
    this.initInterviewForm();
  }

  initInterviewForm() {
    this.interviewForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      mode: ['', Validators.required],
      notes: [''],
    });
  }

  fetchApplication(id: string) {
    this.appService.getApplicationDetails(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.application = res.application;
      },
    });
  }

  updateStatus(newStatus: string) {
    this.appService.changeStatus(this.application._id, newStatus).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
  }

  scheduleInterview() {
    if (this.interviewForm.invalid) return;
    const payload = {
      ...this.interviewForm.value,
      candidateId: this.application.candidateId._id,
      jobId: this.application.jobId._id,
      applicationId: this.application._id,
    };
    // this.appService.scheduleInterview(payload).subscribe(() => {
    //   alert('Interview scheduled successfully');
    //   this.interviewForm.reset();
    // });
  }
}
