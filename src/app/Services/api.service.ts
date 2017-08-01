import { Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../../assets/app_settings';

import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {
    constructor(private http: Http) {}

    getData(url: string): Observable<any[]> {
        // get basic info
        const headers = new Headers({'X-AUTH-TOKEN' :   localStorage.getItem('currentStoreUIUser')});
        const options = new RequestOptions({headers: headers });
        return this.http.get(AppSettings.API_ENDPOINT + url, options)
            .map((response: Response) => response.json());
    }
    putData(data: any, url: string): Observable<any[]> {
        // update basic info
        // let headers = new Headers({});
        const options = new RequestOptions({ });
        return this.http.put(AppSettings.API_ENDPOINT + url, data, options)
            .map((response: Response) => response.json());
    }
    postData(data: any, url: any): Observable<any[]> {
        // post data
        console.log(data);
        // let headers = new Headers({ });
        const options = new RequestOptions({ });

        return this.http.post(AppSettings.API_ENDPOINT + url, data, options)
            .map((response: Response) => response.json());
            // JSON.parse(JSON.stringify(response || null)));
    }
    login(data: any, url: any): Observable<any[]> {
        // post data
        console.log(data);
        // let headers = new Headers({ });
        const options = new RequestOptions({ });

        return this.http.post(AppSettings.API_ENDPOINT + url, data, options)
            .map((response: Response) => response.json());
            // JSON.parse(JSON.stringify(response || null)));
    }
    deleteData(url: string): Observable<any[]> {
        // delete data
        // let headers = new Headers({ });
        const options = new RequestOptions({ });
        return this.http.delete(AppSettings.API_ENDPOINT + url, options)
            .map((response: Response) => response.json());
    }

}
