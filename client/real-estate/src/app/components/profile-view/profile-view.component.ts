import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  homeItem!: MenuItem[];
  editItem!: MenuItem[];
  homeTemplate: boolean = false;
  editTemplate: boolean = false;
  activeItem!: MenuItem;
  imagePreview!: string;
  deleteUrl!: string;
  // userData$!: Observable<IUser>
  currentUser!: IUser

  form: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl('null')
  });
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    // this.userData$ = this.userService.getUser$();
    this.userService.getUser$().subscribe(userData =>{
      console.log(userData)
      this.currentUser = userData

    })
    this.homeItem = [{ label: 'Профил', icon: 'pi pi-fw pi-home' }];
    this.editItem = [{ label: 'Редактирай', icon: 'pi pi-fw pi-pencil' }];
    this.activeItem = this.homeItem[0];
    this.homeTemplate = true;
  }
  home() {
    this.homeTemplate = true;
    this.editTemplate = false;

    console.log(this.activeItem);
    this.activeItem = this.homeItem[0];
    console.log('0');
  }
  edit() {
    this.homeTemplate = false;
    this.editTemplate = true;
    console.log(this.activeItem);
    this.activeItem = this.editItem[0];

    console.log('1');
  }
  onImagePicked(event: Event) {
    if (this.form.value.image !== undefined && this.form.value.image) {
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
  onSubmit(event: Event) {
    const formData = new FormData();
    formData.set('email', this.form.value.email), formData.set('username', this.form.value.username);
    if (this.form.value.image) {
      formData.append('img', this.form.value.image);
    }
    if (this.deleteUrl) {
      formData.set('deleteUrl', this.deleteUrl);
    }
    this.userService.editUser(formData).subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        console.log('success');
      },
      error: (err) => {
        console.log(err.error.message);
      }
    });
  }
}
