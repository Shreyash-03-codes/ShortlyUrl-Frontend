import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortUrlService } from '../../service/short-url/short-url.service';
import { Router } from '@angular/router';

interface Url {
  shortUrl: string;
  longUrl: string;
}

@Component({
  selector: 'app-get-all-url',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-all-url.component.html',
  styleUrls: ['./get-all-url.component.css']
})
export class GetAllUrlComponent implements OnInit {
  urls: Url[] = [];
  loading = false;
  error: string | null = null;

  constructor(private shortUrlService: ShortUrlService, private router: Router) {}

  ngOnInit(): void {
    this.checkToken();
    this.getAllUrls();
  }

  private checkToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigateByUrl('/login');
      }
    }
  }

  getAllUrls() {
    this.loading = true;
    this.error = null;

    this.shortUrlService.getAllUrls().subscribe({
      next: (res: Url[]) => {
        this.urls = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load URLs';
        this.loading = false;
      }
    });
  }
  copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
    .then(() => {
      alert('Copied to clipboard!'); // optional toast or tooltip instead of alert
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
    });
}

}
