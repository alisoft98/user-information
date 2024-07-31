import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PatientDTO } from '../model/patients.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  #http = inject(HttpClient);
  config = environment.apiEndPoint;
  storeProfileImg = new BehaviorSubject<any>([]);
  getStoreProfileImg$ = this.storeProfileImg.asObservable();

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.config}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.#http.request(req);
  }

  getFiles(): Observable<any> {
    return this.#http.get(`${this.config}/files`);
  }

  addPatient(formData: PatientDTO): Observable<PatientDTO[]> {
    return this.#http.post<PatientDTO[]>(
      `${this.config}admin/add-patient`,
      formData
    );
  }

  uploadImgPateint(file: File) {
    const fileToUpload = file as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.#http.post(`${this.config}admin/uploadImage`, formData);

  }
}
