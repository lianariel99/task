import { Component, Inject, OnInit } from '@angular/core';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatDialogModule, ReactiveFormsModule, CommonModule, HttpClientModule, MatButtonModule, MatLabel, MatInputModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{
  empForm: FormGroup;
constructor(
  private _fb: FormBuilder,
  private _empService: TaskService, 
  private _dialogRef: MatDialogRef<TaskFormComponent>, 
  @Inject (MAT_DIALOG_DATA) 
  public data:any,
  private _coreService: CoreService,
){
  this.empForm = this._fb.group({
    title: ['', [Validators.required, Validators.pattern("^[a-zA-Z _-áéíóúÁÉÍÓÚ.,]*$"),]],
    state: ['false'],

  })
}
ngOnInit(): void {
  console.log(this.data.state);
  this.empForm.patchValue(this.data);
}

onFormSubmit(){
  if (this.empForm.valid){
    if(this.data){
      this._empService.update(this.data.id, this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Tarea actualizada correctamente');
          this._dialogRef.close(true);
        },
        error: (err: any) =>{
          console.error(err);
        },
      });
    }
    else{
      this._empService.create(this.empForm.value).subscribe({
      next: (val: any) => {
        console.log(this.empForm.value);
        this._coreService.openSnackBar('Tarea añadida correctamente');
        this._dialogRef.close(true);
      },
      error: (err: any) =>{
        console.error(err);

      },
    });
    }
    
}

else if(this.empForm.invalid){
    this.empForm.markAllAsTouched();
    return
  }
}

campoNoValido(campo: string){
  return this.empForm.get(campo)?.invalid && this.empForm.get(campo)?.touched;

}
}
