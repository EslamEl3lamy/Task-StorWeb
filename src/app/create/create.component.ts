
import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: any;
  constructor(private _MoviesService: MoviesService, private _Router:Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      fileSource: new FormControl('', [Validators.required]),
      category_id: new FormControl(36, [Validators.required]),
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        image: file,
      });
    }
  }

  submit() {
    console.log(this.form.value);

    const formData = new FormData();
    formData.append('name', this.form.get('name').value);
    formData.append('description', this.form.get('description').value);
    formData.append('image', this.form.get('image').value);
    formData.append('category_id', this.form.get('category_id').value);

    this._MoviesService.createMovie(formData).subscribe((data: any) => {
      if (data.status == 'success') {
          this._Router.navigateByUrl('/home');
        // naivgate refresh
      }
    });
  }
}
