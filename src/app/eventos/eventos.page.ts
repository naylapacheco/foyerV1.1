import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar'
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
 
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  event={
    title: '',
    desc:'',
    startTime:'',
    endTime:'',
    allDay: false

  };

  minDate = new Date()


 eventSource = [];

 calendar = {
  mode: 'month',
  currentDate: new Date()
 }

 viewTitle = '';

 @ViewChild(CalendarComponent) myCal:CalendarComponent;

 constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID)private locale){}


 ngOnInit() {
   this.resetEvent();
}

  resetEvent(){
    this.event={
      title: '',
      desc:'',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
  
    };
  }

  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
  
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth(),start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth(),start.getUTCDate() + 1));
      this.resetEvent()
    }
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();  
  }

  changeMode(mode){
    this.calendar.mode = mode;
  }
  back(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.SlidePrev();
  }

  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.SlideNext();
  }
hoje(){
  this.calendar.currentDate= new Date();

}







  
 async onEventSelected(event){
   let start = formatDate(event.startTime, 'medium', this.locale);
   let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    message: 'De: ' + start + '<br><br>Até:' + end,
    buttons: ['OK']
  })
  alert.present();
 }
 
 onViewTitleChanged(title){
  this.viewTitle = title;
 }

 onTimeSelected(evento){
  let selected = new Date(evento.selectedTime);
  this.event.startTime = selected.toISOString();
  selected.setHours(selected.getHours() + 1);
  this.event.endTime = (selected.toISOString());
 }


 

}
