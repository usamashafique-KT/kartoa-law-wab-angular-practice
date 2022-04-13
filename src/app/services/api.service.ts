import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map, catchError } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = environment.apiUrl;
  public apiLanguage = new EventEmitter<string>();
  static headers: HttpHeaders;
  public getToken: string;
  public apiCulture: string;


  constructor(
    private http: HttpClient
  ) {
    this.apiLanguage.subscribe((resp) => {
      this.apiCulture = resp;
    })

    // this.getJSON().subscribe(data => {
    //   console.log(data);
    // });

  }

  // public getJSON(): Observable<any> {
  //   return this.http.get("src/app/data.json");
  // }

  getTimezoneName() {
    const today = new Date();
    const short = today.toLocaleDateString(undefined);
    const full = today.toLocaleDateString(undefined, { timeZoneName: 'long' });

    // Trying to remove date from the string in a locale-agnostic way
    const shortIndex = full.indexOf(short);

    if (shortIndex >= 0) {
      const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);

      // by this time `trimmed` should be the timezone's name with some punctuation -// trim it from both sides
      return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');

    } else {
      // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
      return full;
    }
  }

  getTimezoneOffset() {
    var n = (new Date).getTimezoneOffset()
      , t = Math.abs(n)
      , r = t / 60 | 0
      , u = t % 60 / 60
      , i = r + u;
    return n > 0 ? i * -1 : i
  }


  getHeaders(isbearer: boolean = false) {

    let timezone = this.getCookie('timezone');
    let timezoneoffset = this.getCookie('timezoneoffset');

    //if cookies not set, then get 'timezone' & 'timezoneoffset' from browser also save in cookies
    if (!(!!timezone) || !(!!timezoneoffset)) {
      timezone = this.getTimezoneName();
      timezoneoffset = this.getTimezoneOffset().toString();

      this.setCookie('timezone', timezone, 30);
      this.setCookie('timezoneoffset', timezoneoffset, 30);
    }

    if (isbearer) {
      var _signInUser = localStorage.getItem('_B_JW_Token') || '';

      this.getToken = _signInUser ? _signInUser : '';

      let headers = new HttpHeaders()
        .append('Authorization', `Bearer ${this.getToken}`)
        //.append('Content-Type', 'application/json')
        // .append('Content-Type', 'application/x-www-form-urlencoded')
        //.append('enctype', 'multipart/form-data')
        //.append('charset', 'utf-8')
        //.append('Accept', 'application/json')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Credentials', 'true')
        .append('timezone', this.getTimezoneName())
        .append('timezoneoffset', this.getTimezoneOffset().toString());
      return headers;
    } else {
      let headers = new HttpHeaders()
        //.append('Content-Type', 'application/json')
        // .append('Content-Type', 'application/x-www-form-urlencoded')
        //.append('enctype', 'multipart/form-data')
        //.append('charset', 'utf-8')
        //.append('Accept', 'application/json')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Credentials', 'true')
        .append('timezone', this.getTimezoneName())
        .append('timezoneoffset', this.getTimezoneOffset().toString());
      return headers;
    }


  }

  setCookie(name: any, value: any, days: any) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  getCookie(name: any) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  eraseCookie(name: any) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  post(endpoint: string, body: any, options?: any, lang = true, isAuth: boolean = false) {
    if (!options) {
      options = {};
    }

    options.headers = this.getHeaders(isAuth);

    return <Observable<any>>this.http.post(this.baseUrl + (lang ? '/' + this.apiCulture : '') + '/api/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: any, lang?: boolean, isAuth: boolean = false) {
    if (!options) {
      options = {};
    }

    options.headers = this.getHeaders(isAuth);

    return <Observable<any>>this.http.put(this.baseUrl + (lang ? '/' + this.apiCulture : '') + '/api/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: any, lang?: boolean) {
    if (!options) {
      options = {};
    }

    options.headers = this.getHeaders();

    return <Observable<any>>this.http.delete(this.baseUrl + (lang ? '/' + this.apiCulture : '') + '/api/' + endpoint, options);
  }

  get(endpoint: string, params?: any, options?: any, lang?: boolean, isAuth: boolean = false) {
    if (!options) {
      options = {};
    }

    if (params) {
      let p = new HttpParams();
      for (let k in params) {
        p = p.append(k, params[k]);
      }
      options.params = p || options.search;
    }

    options.headers = this.getHeaders(isAuth);



    return <Observable<any>>this.http.get(this.baseUrl + (lang ? '/' + this.apiCulture : '') + '/api/' + endpoint, options);
  }

  // gets() {
  //   return this.http.get(this.baseUrl);
  // }
}
