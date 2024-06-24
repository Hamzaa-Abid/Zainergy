import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { exceptForLoader } from '../constant'

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  newReq: any

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.newReq = req    
    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.onEnd();
      }
    },
      (err: any) => {
        this.onEnd();
      }));
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {        
    if (this.newReq.body?.action != exceptForLoader.kpi) {
      this.loaderService.show();
      setTimeout(() => {
        this.onEnd()
      }, 7000)
    }
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

}
