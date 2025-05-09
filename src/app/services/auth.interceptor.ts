
import { HttpInterceptorFn } from '@angular/common/http';
 
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('id_token');

  const gateKey = localStorage.getItem('GateKey');
  
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      GateKey: gateKey || '' // Add GateKey from cookies
    } 
  });
  return next(modifiedReq);
};