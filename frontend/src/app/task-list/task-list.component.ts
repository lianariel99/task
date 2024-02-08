import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {MatMenuModule} from '@angular/material/menu';
import { TableModule } from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CoreService } from '../core/core.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { YesNoPipe } from '../yes-no.pipe';
import {MatTooltip} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import { ButtonModule } from 'primeng/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatToolbarModule, BreadcrumbModule, MatMenuModule, TableModule, MatIconModule, CommonModule, HttpClientModule, MatButtonModule, YesNoPipe, MatTooltip, MatChipsModule, ButtonModule, MatSelectModule, MatInputModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{
  informacion: any; //arreglo con todos los elementos traidos del backend
  tree: MenuItem[] | undefined;
  home: MenuItem | undefined;
  scienceAreaList: any;
  formingOrganismList: any;
  emptyInformation: boolean = false;
  constructor(
    private _dialog: MatDialog, 
    private _empService: TaskService, 
    private _coreService: CoreService,
  ){}


  ngOnInit(): void {
    this.tree = [{ label: 'Tareas' }, { label: 'Listado' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.getList();
  }

  // Abrir ventana emergente para añadir tarea nueva
  openAddEditForm(){
    const DialogRef = this._dialog.open(TaskFormComponent)
    DialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getList();
        }
      }
    })
  }
  
  // Obtener listado de tareas
  getList(){
    this._empService.getAll().subscribe({
      next: (res) => {
        this.informacion = res;
        if(this.informacion?.length == 0){
          this.emptyInformation = true;
        }
        else{
          this.emptyInformation = false;
        }
      },
      error: console.log,
    })
  }

  // Eliminar tarea
  deleteTask(id: number){
    Swal.fire({
      title: '¿Está seguro que desea eliminar la tarea seleccionada?',
      text: 'Este proceso no puede ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._empService.delete(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Tarea eliminada correctamente')
            this.getList();
          },
          error: console.log,
        })
      }
    });
  }

  // Abrir ventana emergente para editar una tarea
  openEditForm(data:any){
    const dialogRef = this._dialog.open(TaskFormComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getList();
        }
      }
    })
  }

  //Marcar la tarea como completada
  markAsDoIt(data:any){
    

    Swal.fire({
      title: '¿Está seguro que desea marcar la tarea como completada?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        data.state=true;
        this._empService.update(data.id, data).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Tarea marcada como realizada')
            this.getList();
          },
          error: console.log,
        })
      }
    });
  }

  //Para configurar el color de la chip
  chipColor(data:any){
    if (data.state) {
      return "green"
    }
    return "orange"
  }

  // FILTROS

  see = false; // esta propiedad muestra el panel de los filtros de arriba
  //Funcion que muestra el panel con toso los filtros
  titleFilter = false;
  stateFilter = false;
  //Funcion que muestra todos los filtros
  seeAllFilters(){
    if(this.titleFilter == false || this.stateFilter == false ){
      this.see = true;
      this.titleFilter = true;
      this.stateFilter = true;
    }
  }

  //Funcion que cierra todos los filtros
  closeAllFilters(){
    this.see = false;
    this.titleFilter = false;
    this.stateFilter = false;
    window.location.reload()
  }

  titleFilterFunction(){
    if(this.titleFilter==false){
      this.titleFilter = true;
      this.see = true;
    }
    else if(this.titleFilter==true){
      this.titleFilter = false;
      if(
        this.titleFilter==false && this.stateFilter==false 
        ){
          this.see = false;
          window.location.reload()
        }
    }
  }

  stateFilterFunction(){
    if(this.stateFilter==false){
      this.stateFilter = true;
      this.see = true;
    }
    else if(this.stateFilter==true){
      this.stateFilter = false;
      if(
        this.titleFilter==false && this.stateFilter==false 
        ){
          this.see = false;
          window.location.reload()
        }
    }
  }
}



  




