import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShortUrlService } from '../../service/short-url/short-url.service';
import { Router } from '@angular/router';

interface ShortUrlResponse {
  shortUrl: string;
}

@Component({
  selector: 'app-get-short-url',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './get-short-url.component.html',
  styleUrls: ['./get-short-url.component.css']
})
export class GetShortUrlComponent implements OnInit {
  form: FormGroup;
  shortUrl: string | null = null;
  error: string | null = null;
  loading = false;
  copied = false;

  constructor(private fb: FormBuilder, private shortUrlService: ShortUrlService, private router: Router) {
    this.form = this.fb.group({
      longUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]]
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

    this.shortUrl = null;
    this.error = null;
    this.loading = true;
    this.copied = false;

    const longUrl = this.form.value.longUrl;

    this.shortUrlService.shortenUrl(longUrl).subscribe({
      next: (res: ShortUrlResponse) => {
        this.shortUrl = res.shortUrl;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to generate short URL';
        this.loading = false;
      }
    });
  }

  copyToClipboard() {
    if (this.shortUrl) {
      navigator.clipboard.writeText(this.shortUrl).then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 2000);
      });
    }
  }
}
