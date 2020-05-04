import { CustomerService } from './../../../../core/services/customer.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit, OnDestroy {

  @Input() userId;
  @Input() username;
  @Input() description;
  @Input() address;
  @Input() picture;
  @Input() location;

  ngUnsubscribe = new Subject()
  addressInput

  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    description: new FormControl(''),
    address: new FormControl('', Validators.required),
    location: new FormGroup({
      lng: new FormControl('', Validators.required),
      lat: new FormControl('', Validators.required)
    })
  });

  constructor(
    private modalCtrl: ModalController,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.profileForm.patchValue({
      username: this.username,
      description: this.description,
      address: this.address,
      location: {
        lng: this.location.coordinates[0],
        lat: this.location.coordinates[1]
      }
    });
    this.customerService.$customer.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((res)=>{
      this.modalCtrl.dismiss()
    })
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete()
  }
  
  onAddressSelected(data){
    this.profileForm.patchValue({
      address: data.addressInput,
      location: {
        lng: data.location.lng,
        lat: data.location.lat
      }
    })
  }

  async close(){
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    this.customerService.setCustomerProfile(this.profileForm.value);
  }
}
