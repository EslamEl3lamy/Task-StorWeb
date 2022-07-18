import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss'],
})
export class MoviesDetailsComponent implements OnInit {
  form: any | FormGroup;
  movie: any;
  id: any;

  constructor(
    private _MoviesService: MoviesService,
    private _ActivatedRoute: ActivatedRoute,private _Router:Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this._ActivatedRoute.params.subscribe((params) => {
      this.id = params.id;
      this._MoviesService.getItemDetails(this.id).subscribe((data) => {
        this.movie = data.message;
        this.initForm();
      });
    });
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(this.movie?.name),
      description: new FormControl(this.movie?.description),
      image: new FormControl(),
    });
  }

  submit() {
    console.log(this.form.value);
    this._MoviesService.updateMovie(this.id, this.form.value).subscribe((data: any) => {
      if(data.status == 'success') {
      this._Router.navigateByUrl('/home');
        // naivgate refresh
      }
    });
  }

  delete() {
    this._MoviesService.deleteMovie(this.id).subscribe((data: any) => {
      if(data.status == 'success') {
        this._Router.navigateByUrl('/home');
      }
    });
  }
}
