import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-google-login-button',
  templateUrl: 'google-login-button.component.html',
  styleUrls: ['google-login-button.component.scss']
})

export class GoogleLoginButtonComponent implements OnInit {
  @Input() role:string = null;
  @Input() isDisabled: boolean = false;
  @Input() location:any = null;
  @Input() address:string = null

  constructor(
    private authService: AuthService,
    public loadingService: LoadingService) { }

  ngOnInit() { }

  async loginWithGoogle(){
    this.authService.loginWithGoogle(this.role, this.location, this.address);
  }
}