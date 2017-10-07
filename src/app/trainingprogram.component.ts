import { Component, Input, OnInit } from '@angular/core';
import { TrainingProgramService } from './trainingprogram.service';
import { TrainingProgram } from './trainingprogram';
import { NgForm } from '@angular/forms';

@Component({
	selector : 'training-programs',
	templateUrl : './trainingprogram.component.html'
})

export class TrainingProgramComponent implements OnInit {
	trainingPrograms : TrainingProgram[];
	newTrainingProgram: TrainingProgram = new TrainingProgram();
	editing: boolean = false;
	editingTrainingProgram: TrainingProgram = new TrainingProgram();
	isDesc: boolean = false;
	column: string = 'StatusVal';
	
	constructor(
		private trainingProgramService : TrainingProgramService,
		){}
	
	ngOnInit() : void {
		this.getTrainingPrograms();
		this.newTrainingProgram.statusVal='Pending';
	}
	
	getTrainingPrograms() : void {
		this.trainingProgramService.getTrainingPrograms()
		.then(
			trainingPrograms => this.trainingPrograms = trainingPrograms
		);
	}
	
	createTrainingProgram(trainingProgramForm : NgForm) : void {
		this.trainingProgramService.createTrainingProgram(this.newTrainingProgram)
		.then(
			createTrainingProgram => {        
				trainingProgramForm.reset();
				this.newTrainingProgram = new TrainingProgram();
				this.newTrainingProgram.statusVal='Pending';
				this.trainingPrograms.unshift(createTrainingProgram);				
			}
		);
	}
	
	deleteTrainingProgram(id:string) : void {
		this.trainingProgramService.deleteTrainingProgram(id)
		.then(
			() => { 
				this.trainingPrograms = this.trainingPrograms.filter(trainingprogram => trainingprogram.id != id);
			}
		);
	}
	
	updateTrainingProgram(trainingProgramData : TrainingProgram) : void {
		this.trainingProgramService.updateTrainingProgram(trainingProgramData).
		then(
			updatedTrainingProgram => {
				let existingTrainingProgram = this.trainingPrograms.find(trainingprogram => trainingprogram.id === updatedTrainingProgram.id);
				Object.assign(existingTrainingProgram, updatedTrainingProgram);
				this.editing = false;
			}
		);
	}
	
	editTrainingProgram(trainingProgramData : TrainingProgram) : void {
		this.editing = true;
		Object.assign(this.editingTrainingProgram, trainingProgramData);
	}
	
	sort(property){
		this.isDesc = !this.isDesc; //change the direction    
		this.column = property;
		let direction = this.isDesc ? 1 : -1;

		this.trainingPrograms.sort(function(a, b){
			if(a[property] < b[property]){
				return -1 * direction;
			}
			else if( a[property] > b[property]){
				return 1 * direction;
			}
			else{
				return 0;
			}
		});
	};
}
