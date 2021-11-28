import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface Client {
  id: number,
  name:string,
  email: string,
  date: Date,
  address: string,
  action?: string
}

const ELEMENT_DATA: Client[] = [
  {id:Math.floor(Math.random() * 10000),name:'suimco', email: 'suimco@suimco.es',  date: new Date(2021, 6, 1), address:'Girona'},
  {id:Math.floor(Math.random() * 10000),name:'everis', email: 'everis@everis.es' ,date: new Date(2020, 7, 2), address:'Tokyo'},
  {id:Math.floor(Math.random() * 10000),name:'catalog', email: 'catalog@catalog.es', date: new Date(2019, 8, 3), address:'Oslo'},
  {id:Math.floor(Math.random() * 10000),name:'factor energia',email:'factor@energia.es', date: new Date(2018, 19, 4), address:'Waterloo'},
  {id:Math.floor(Math.random() * 10000),name:'riot games',email:'riot@games.es', date: new Date(2017, 10, 5), address:'Lleida'},
  {id:Math.floor(Math.random() * 10000),name:'blizzard',email:'blizzard@blizzard.es', date: new Date(2016, 11, 6), address:'Barcelona'},
  {id:Math.floor(Math.random() * 10000),name:'amon', email:'amon@amon.es', date: new Date(2015, 12, 7), address:'Wisconsin'},
]

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'email', 'date', 'address', 'actions']
  public dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  constructor(public dialog: MatDialog) { }

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
        case 'email':
          return this.compare(a.email, b.email, isAsc);
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

  addRowData(row_obj:Client){
    var d = new Date();
    this.dataSource.push({
      id:Math.floor(Math.random() * 10000),
      name:row_obj.name,
      email: row_obj.email,
      date: d,
      address: row_obj.address
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj:Client){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.email = row_obj.email;
        value.address = row_obj.address;
      }
      return true;
    });
  }
  deleteRowData(row_obj:Client){
    this.dataSource = this.dataSource.filter(u => u.id !== row_obj.id);
  }

  openDialog(action:any,obj:Client | any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

}
