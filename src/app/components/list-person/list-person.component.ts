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

  constructor(private fb: FormBuilder, private _departmentService: DepartmentService, private _countryService: CountryService, private _personService: PersonService) {

    this.personForm = this.fb.group({
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

  }

  ngOnInit(): void {

  }

  save(): void {

  }

  loadDepartmentsByCountryId(id: any): void {
    this._departmentService.getAllDepartmentsByCountry(id.target.value).subscribe(response => {
      this.listDepartments = response;
    }, error => {
      console.log(error);
    });
  }
}
