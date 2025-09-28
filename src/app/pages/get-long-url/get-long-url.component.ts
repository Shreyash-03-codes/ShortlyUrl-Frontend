import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShortUrlService } from '../../service/short-url/short-url.service';
import { Router } from '@angular/router';

interface LongUrlResponse {
  longUrl: string;
}

@Component({
  selector: 'app-get-long-url',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './get-long-url.component.html',
  styleUrls: ['./get-long-url.component.css']
})
export class GetLongUrlComponent implements OnInit {
  form: FormGroup;
  longUrl: string | null = null;
  error: string | null = null;
  loading = false;
  copied = false;

  constructor(private fb: FormBuilder, private urlService: ShortUrlService, private router: Router) {
    this.form = this.fb.group({
      shortUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.checkToken();
  }

  private checkToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigateByUrl('/login');
      }
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.longUrl = null;
    this.error = null;
    this.loading = true;
    this.copied = false;

    const shortUrl = this.form.value.shortUrl;

    this.urlService.getLong(shortUrl).subscribe({
      next: (res: LongUrlResponse) => {
        this.longUrl = res.longUrl;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Could not fetch long URL. Please check the short URL.';
        this.loading = false;
      }
    });
  }

  copyToClipboard() {
    if (this.longUrl) {
      navigator.clipboard.writeText(this.longUrl).then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 2000);
      });
    }
  }
}
