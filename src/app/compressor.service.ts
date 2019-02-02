import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompressorService {

  constructor() { }
  compress(file: File): Observable<any> {
    const width = 150; // For scaling relative to width
    const height=150;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return Observable.create(observer => {
      reader.onload = ev => {
        const img = new Image();
        img.src = (ev.target as any).result;
        (img.onload = () => {
          const elem = document.createElement('canvas'); // Use Angular's Renderer2 method
          const scaleFactorX =width / img.width;
          const scaleFactorY=height / img.height;
          elem.width = img.width * scaleFactorX;
          elem.height = img.height * scaleFactorY;
          const ctx = <CanvasRenderingContext2D>elem.getContext('2d');
          ctx.drawImage(img, 0, 0, img.width*scaleFactorX, img.height * scaleFactorY);
          ctx.canvas.toBlob(
            blob => {
              observer.next(
                new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                }),
              );
            },
            'image/jpeg',
            1,
          );
        }),
          (reader.onerror = error => observer.error(error));
      };
    });
  }
}
