import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publication-view',
  templateUrl: './publication-view.component.html',
  styleUrls: ['./publication-view.component.css'],
  providers: [PublicationService]
})
export class PublicationViewComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;
  public publication: any;
  formattedAddress: string;

  ngOnInit(): void {
    this.getPublication();
  }

  constructor(private router: Router,
    private publicationService: PublicationService) { }

  getPublication() {
    this.publicationService.findById(Number(window.location.pathname.slice(-1))).subscribe(
      publication => {
        this.publication = publication;
        this.getCoordinates(publication.pickUpAddress);
      },
      err => {
        console.log(err);
      }
    );
    console.log(this.publication);
  }

  getCoordinates(address: string) {
      this.publicationService.getCoordinates(address).subscribe(
        response => {
          console.log(response.results[0]);
          this.lat = response.results[0].geometry.location.lat;
          this.lng = response.results[0].geometry.location.lng;
        },
        err => {
          console.log(err);
        }
      );
  }
}
