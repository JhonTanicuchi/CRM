import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Persona } from '../compartidos/models/persona';
import { ApiService } from '../compartidos/service/api.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personaSelect: Persona;
  displayPersonaSelect: boolean = false;
  displayPersonaEdit: boolean = false;

  personas: Persona[];

  displayNuevaPersona: boolean = false;
  formPersona: FormGroup
  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formPersona = this.fb.group({
      nombre: [null, [Validators.required, Validators.minLength(3)]],
      apellido: [null, [Validators.required, Validators.minLength(3)]],
      cedula: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      correo: [null, [Validators.required, Validators.email]],
      celular: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],

    });
    this.listarPersona();
  }



  guardarPersona() {
    console.log(this.formPersona.value);
    //apiservice
    const NuevaPersona: Persona = {
      ...this.formPersona.value
    }
    this.apiService.createPersona(NuevaPersona).subscribe(respuesta => { console.log(respuesta); this.displayNuevaPersona = false; this.listarPersona() })

  }

  listarPersona() {
    this.apiService.findAll()
      .subscribe(respuesta => { this.personas = respuesta })

  }

  buscarPersona(id: number) {
    this.apiService.buscarId(id).subscribe(respuesta => { console.log(respuesta); this.personaSelect = respuesta; this.displayPersonaSelect = true })

  }

  actualizarPersona() {
    const persona: Persona = {
      personaId: this.personaSelect.personaId,
      ...this.formPersona.value
    }
    this.apiService.updatePersona(persona).subscribe(respuesta => { this.displayPersonaSelect = true; this.personaSelect = respuesta; this.displayPersonaEdit = false; this.listarPersona() })

  }
  selectPersonaEdit(persona: Persona) {

    this.personaSelect = persona;
    this.formPersona.patchValue({

      nombre: this.personaSelect.nombre,
      apellido: this.personaSelect.apellido,
      cedula: this.personaSelect.cedula,
      correo: this.personaSelect.correo,
      celular: this.personaSelect.celular,

    });
    this.displayPersonaSelect = true;
    this.displayPersonaEdit = true;

  }

  eliminarPersona(id: number) {
    this.apiService.deletePersona(id).subscribe(respuesta => { this.listarPersona(); this.displayPersonaSelect = false })

  }

}
