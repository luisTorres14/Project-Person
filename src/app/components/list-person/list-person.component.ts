import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { CountryService } from '../../services/country.service';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit {

  personForm: FormGroup;
  listCountries: any;
  listDepartments: any;
  listPerson: any;
  incorrectForm: boolean;

  constructor(private fb: FormBuilder, private _departmentService: DepartmentService, private _countryService: CountryService, private _personService: PersonService) {
    this.incorrectForm = false;
    this.personForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      country: ['', Validators.required],
      department: ['', Validators.required],
    });

    _countryService.getAllCountries().subscribe(response => {
      this.listCountries = response;

    }, error => {
      console.log(error);
    });

    _personService.getAllPersons().subscribe(response => {
      this.listPerson = response;
    }, error => {
      console.log(error);

    });

    this.personForm.get('country')?.valueChanges.subscribe(value => {
      this._departmentService.getAllDepartmentsByCountry(value.id).subscribe(response => {
        this.listDepartments = response;
      }, error => {
        console.log(error);
      });
    });
  }

  ngOnInit(): void {

  }

  save(): void {
    this._personService.savePerson(this.personForm.value).subscribe(response => {
      this.personForm.reset();
      this.listPerson = this.listPerson.filter((persona: any) => response.id !== persona.id);
      this.listPerson.push(response);
    }, error => {
      console.log(error);

    });
  }

  delete(person: any): void {
    this._personService.deletePerson(person.id).subscribe(response => {
      if (response === true) {
        this.listPerson.pop(person);
      }
    }, error => {
      console.log(error);

    });
  }

  edit(person: any): void {
    this.personForm.setValue({
      id: person.id,
      name: person.name,
      lastname: person.lastname,
      age: person.age,
      country: person.country,
      department: person.department,
    });
  }
}
