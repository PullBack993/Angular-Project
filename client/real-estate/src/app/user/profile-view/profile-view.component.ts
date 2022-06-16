import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  defaultImg: string = '../../../assets/images/profileImg.png';
  homeItem!: MenuItem[];
  editItem!: MenuItem[];
  homeTemplate: boolean = false;
  editTemplate: boolean = false;
  activeItem!: MenuItem;
  imagePreview!: string;
  deleteUrl!: string;
  currentUser!: IUser;
  private subscription!: Subscription;

  form: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl('null')
  });
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.homeItem = [{ label: 'Profil', icon: 'pi pi-fw pi-home' }];
    this.editItem = [{ label: 'Bearbeiten', icon: 'pi pi-fw pi-pencil' }];
    this.activeItem = this.homeItem[0];
    this.homeInit();
  }

  homeInit() {
    this.subscription = this.userService.getUser$().subscribe((userData) => {
      this.currentUser = userData;
      this.homeTemplate = true;
      this.activeItem = this.homeItem[0];
    });
  }

  home() {
    this.homeTemplate = true;
    this.activeItem = this.homeItem[0];
  }

  edit() {
    this.homeTemplate = false;
    this.activeItem = this.editItem[0];
  }

  checkTouch(controlName: string, sourceGroup: FormGroup) {
    return sourceGroup.controls[controlName]?.touched && sourceGroup.controls[controlName].invalid;
  }
  onImagePicked(event: Event) {
    if (this.form.value.image != 'null') {
      this.deleteUrl = this.currentUser.userData.imageUrl;
    }
    let file: any = (event.target as HTMLInputElement).files;
    if (file[0]) {
      this.form.patchValue({ image: file[0] });
      this.form.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      let fileBlob = file[0];
      reader.readAsDataURL(fileBlob);
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.set('email', this.form.value.email), formData.set('username', this.form.value.username);

    if (this.form.value.image != 'null') {
      formData.append('img', this.form.value.image);
    } else if (this.currentUser.userData.imageUrl && this.form.value.image == 'null') {
      formData.append('img', this.currentUser.userData.imageUrl);
    }
    if (this.deleteUrl) {
      formData.set('deleteUrl', this.deleteUrl);
    }
    this.userService.editUser(formData).subscribe({
      complete: () => {
        this.homeInit();
      },
      error: (err) => {
        console.log(err.error.message);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
