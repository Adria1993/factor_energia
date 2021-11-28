import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BackendApiService } from 'src/app/services/backend-api.service';

interface Factura {
  name:string,
  date: Date,
  amount: number,
  address: string
}

const ELEMENT_DATA: Factura[] = [
  {name:'suimco', date: new Date(2021, 6, 1), amount: 10, address:'Girona'},
  {name:'everis', date: new Date(2020, 7, 2), amount: 110, address:'Tokyo'},
  {name:'catalog', date: new Date(2019, 8, 3), amount: 120, address:'Oslo'},
  {name:'factor energia', date: new Date(2018, 19, 4), amount: 130, address:'Waterloo'},
  {name:'riot games', date: new Date(2017, 10, 5), amount: 131, address:'Lleida'},
  {name:'blizzard', date: new Date(2016, 11, 6), amount: 132, address:'Barcelona'},
  {name:'amon', date: new Date(2015, 12, 7), amount: 145, address:'Wisconsin'},
]

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {
  @ViewChild("outsideElement", {static: true}) outsideElement : ElementRef;
  @ViewChild('modalView', {static: true}) modalView$ : ElementRef;
  public displayedColumns: string[] = ['name', 'date', 'amount', 'address', 'actions']
  public dataSource = ELEMENT_DATA; 
  constructor(private service: BackendApiService) { }

  ngOnInit(): void {
  }

  public sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'date':
          return this.compare(a.date.getTime(), b.date.getTime(), isAsc);
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'address':
          return this.compare(a.address, b.address, isAsc);
        default:
          return 0;
      }
    });
  }
  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openModal() {
    this.modalView$.nativeElement.classList.add('visible');
  }

  closeModal() {
    this.modalView$.nativeElement.classList.remove('visible');
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement:any) {
    const outsideElement = this.outsideElement.nativeElement.contains(targetElement);
    if (outsideElement) {
      this.modalView$.nativeElement.classList.remove('visible');
    } 
  }
  public downloadPDF(name:any){
    this.service.downloadFile("../../../assets/dummy.pdf").subscribe((data) => {
      let filepath = window.URL.createObjectURL(data);
      var link=document.createElement('a');
      link.href = filepath;
      link.download = name;
      link.click();
    }, (error) => {
      console.log(error)
    });
  }
}

