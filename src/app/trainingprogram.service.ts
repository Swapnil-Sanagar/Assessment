import { Injectable } from '@angular/core';
import { TrainingProgram } from './trainingprogram';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TrainingProgramService {
	private baseUrl = "http://localhost:8080";
	
	constructor (private http:Http){}
	
	getTrainingPrograms() : Promise<TrainingProgram[]> {
		return this.http.get(this.baseUrl + '/trainingprogram/list').toPromise().then(response => response.json() as TrainingProgram[])
		.catch(this.handleError);
	}
	
	createTrainingProgram(trainingProgramData : TrainingProgram) : Promise<TrainingProgram> {
		return this.http.post(this.baseUrl + '/trainingprogram/add', trainingProgramData).toPromise().then(response => response.json() as TrainingProgram)
		.catch(this.handleError);
	}
	
	updateTrainingProgram(trainingProgramData : TrainingProgram) : Promise<TrainingProgram> {
		return this.http.put(this.baseUrl+"/trainingprogram/update/"+trainingProgramData.id, trainingProgramData).toPromise().then(response => response.json() as TrainingProgram)
		.catch(this.handleError);
	}
	
	deleteTrainingProgram(id: string) : Promise<any> {
		return this.http.delete(this.baseUrl+"/trainingprogram/delete/"+id).toPromise()
		.catch(this.handleError);
	}
	
	private handleError(error : any) : Promise<any> {
		console.error('Some error Occured', error);
		return Promise.reject(error.message || error);
	}
}