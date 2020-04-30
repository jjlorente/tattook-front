import { CustomerService } from './../../../../core/services/customer.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {

  @Input() userId;
  @Input() username;
  @Input() description;
  @Input() address;
  @Input() picture;

  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    description: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private modalCtrl: ModalController,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.profileForm.patchValue({
      username: this.username,
      description: this.description
    });
  }

  async close(){
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.customerService.setCustomerProfile(this.profileForm.value);
  }
}
