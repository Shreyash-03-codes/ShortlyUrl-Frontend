import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShortUrlService } from '../../service/short-url/short-url.service';

@Component({
  selector: 'app-delete-url',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delete-url.component.html',
  styleUrls: ['./delete-url.component.css']
})
export class DeleteUrlComponent implements OnInit {
  form: FormGroup;
  success: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private urlService: ShortUrlService,
    private router: Router
  ) {
    this.form = this.fb.group({
      shortUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // SSR-safe token check
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        this.router.navigateByUrl('/login');
      }
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.success = null;
    this.error = null;
    this.loading = true;

    const shortUrl: string = this.form.value.shortUrl;

    this.urlService.deleteUrl(shortUrl).subscribe({
      next: () => {
        this.success = `Short URL '${shortUrl}' deleted successfully.`;
        this.loading = false;
        this.form.reset();
      },
      error: (err) => {
        this.error = `Failed to delete short URL '${shortUrl}'.`;
        console.error(err);
        this.loading = false;
      }
    });
  }
  copied = false;

copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);
  });
}

}
