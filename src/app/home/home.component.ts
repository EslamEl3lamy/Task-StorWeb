import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../movies.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Movies: any[] = [];
  constructor(private _MoviesService:MoviesService) {

    _MoviesService.getTrending().subscribe((data)=>{
      this.Movies = data.message;
      console.log(data.message);

      // .slice(0,10)
    });

   }
  ngOnInit(): void {
  }

  imagePath(img: string) {
    return `https://test-api.storexweb.com/${img}`;
  }
}
