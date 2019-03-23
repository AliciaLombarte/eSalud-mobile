import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//let apiUrl = 'http://163.117.247.172:8081/';
//let apiUrl = 'http://192.168.1.41:8081/';
let apiUrl = 'http://localhost:8081/';
//let apiUrl = 'http://192.168.1.42:8081/';

@Injectable()
export class AuthService {

  result: any = null;

  constructor(public http: Http) {}

  login(loginData) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiUrl+'login', JSON.stringify(loginData), {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  logout(){
    console.log('AuthService logout');
    return new Promise((resolve, reject) => {
    let headers = new Headers();
    headers.append('X-Auth-Token', localStorage.getItem('token'));
    this.http.post(apiUrl+'logout', {}, {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
      }); 
    }); 
  }

  postInfo(userData){
    console.log(userData);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiUrl+'woundInfo', JSON.stringify(userData), {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  postResultQuest(userData){
    console.log(userData);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.put(apiUrl+'resultQuest', JSON.stringify(userData), {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getQuestions(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.get(apiUrl+'questions', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  changePass(passData){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiUrl+'changePass', JSON.stringify(passData), {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getIfTrack(userData){
    console.log(userData)
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiUrl+'ifTrack', JSON.stringify(userData), {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
/*
  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'signup', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }
 */
}
