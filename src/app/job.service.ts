import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { jobData } from './jobdata';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private Url = 'https://nut-case.s3.amazonaws.com';
 
  constructor(private http: HttpClient) { }

  getData (): Observable<jobData[]> {
    return this.http.get<jobData[]>(this.Url+"/jobs.json")
      .pipe(catchError(this.handleError<jobData[]>('getHeroes', []))
      );
  }
  
  searchData(data,val){
    let newarr = [];
    let finaldata = [];
    let convertdata = [];
     for(var i =0 ; i < data.length ; i++) {
        if(val == 'location'){
            convertdata = data[i].location.split(/[\/,]+/);
        }if(val == 'skills'){
          convertdata = data[i].skills.split(/[\/,]+/);
        }    
        for( var l=0;l< convertdata.length ; l++){
              newarr.push(convertdata[l].trim().toLocaleLowerCase());
        }
     }
     return newarr.filter((x, i, a) => x && a.indexOf(x) === i);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
       console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
