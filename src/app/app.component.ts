import { Component,OnInit ,ViewEncapsulation} from '@angular/core';
import { jobData } from './jobdata';
import { JobService } from './job.service';
import { NgxSpinnerService } from "ngx-spinner";
import { PagerService } from './pager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit  {
  data: jobData[] = [];
  mainDataArrNeverChange:jobData[] = [];
  title = 'byjus';
  totallength : number;
  txtlocation:string;
  location:any = [];
  skilldata:any = [];
  expdata:any = [];
  txtexperienceData:string = 'select experience';
  
  txtskills : any;
  pager: any = {};
  pagedItems: any[];
constructor(private jobService1: JobService,private spinner: NgxSpinnerService,private pagerService: PagerService) { }

ngOnInit() {
  this.spinner.show();
  this.getJobData();
}

getJobData(): void {
  this.jobService1.getData().subscribe(data => {this.data = data['data']; this.mainDataArrNeverChange = data['data'];  this.totallength = this.data.length; this.experienceData(); this.setPage(1); this.spinner.hide();});
}

experienceData(){
  let tmpdata =[];
  tmpdata.push('select experience');
  for(var i = 0 ; i < this.mainDataArrNeverChange.length ; i++){
    tmpdata.push(this.mainDataArrNeverChange[i].experience);
  }
  this.expdata =  tmpdata.filter((x, i, a) => x && a.indexOf(x) === i);
  
}

search(val): void {
    if(this.txtlocation){
      let tmpdata =    this.jobService1.searchData(this.mainDataArrNeverChange,val);
      if(val == 'location'){
        this.location = this.searchFromArray(tmpdata, this.txtlocation);
      } else if(val == 'skills'){
        this.skilldata = this.searchFromArray(tmpdata, this.txtskills);
      }
    } else {
      this.location = [];
    }
}
 
searchFromArray(arr, regex) {
  let matches = [], i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].match(regex)) {
      matches.push(arr[i]);
    }
  }
  return matches;
};

searchResult(){
 let newdata;
 
  if(this.txtlocation != undefined && this.txtskills != undefined && this.txtexperienceData == 'select experience' ) {
   newdata = this.mainDataArrNeverChange.filter(option => {
      return option.location.toLowerCase().indexOf(this.txtlocation.toLowerCase()) === 0 && option.skills.toLowerCase().indexOf(this.txtskills.toLowerCase()) === 0
  })
  this.totallength = newdata.length;
  if(newdata.length > 0){
      this.data = newdata;
  }else {
    this.data = [];    
  }
  this.setPage(0);
}
else if(this.txtlocation != undefined && this.txtskills != undefined && this.txtexperienceData != undefined) {
  newdata = this.mainDataArrNeverChange.filter(option => {
    return option.location.toLowerCase().indexOf(this.txtlocation.toLowerCase()) === 0 && option.skills.toLowerCase().indexOf(this.txtskills.toLowerCase()) === 0 && option.experience.toLowerCase().indexOf(this.txtexperienceData.toLowerCase()) === 0 
  })

this.totallength = newdata.length;
if(newdata.length > 0) {
  this.data = newdata;
}else{
  this.data = []; 
}
this.setPage(0);
}
}
assignValueOnTextBox(val,name){
  if(name == 'location'){
    this.txtlocation = val;
    this.location = [];
    
  }else if(name == 'skills'){
    this.txtskills = val;
    this.skilldata = [];
  }
  
}

setPage(page: number) {
  // get pager object from service
  this.pager = this.pagerService.getPager(this.data.length, page);

  // get current page of items
  this.pagedItems = this.data.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
expdsc(val){
  if(val == 'dsc'){
    this.data = this.sortString();
    this.setPage(1); 
  }
  else if(val == 'asc'){
    this.data = this.sortreserveString();
    this.setPage(1); 
  }
   
}

sortString() {
  var tmp;
  for(var i = 0; i < this.data.length; i++) {
    for(var j = i + 1; j < this.data.length; j++) {
      if(this.data[i].experience.trim() > this.data[j].experience.trim()) {
        tmp = this.data[i].experience;
        this.data[i].experience = this.data[j].experience;
        this.data[j].experience = tmp;
      }
    }
  }
  return this.data;
}
sortreserveString() {
  var tmp;
  for(var i = 0; i < this.data.length; i++) {
    for(var j = i + 1; j < this.data.length; j++) {
      if(this.data[i].experience.trim() < this.data[j].experience.trim()) {
        tmp = this.data[i].experience;
        this.data[i].experience = this.data[j].experience;
        this.data[j].experience = tmp;
      }
    }
  }
  return this.data;
}

}
