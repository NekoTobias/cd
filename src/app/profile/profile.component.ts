import { Component, OnInit } from '@angular/core';
import { ChatterService } from '../chatter.service';
import { Observable, EMPTY, of } from 'rxjs';
import { Chatter } from '../chatter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompressorService } from '../compressor.service';
import { map, expand } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private ownchatter$: Observable<Chatter>
  private chatteravas$: Observable<any>

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private readonly chatterService: ChatterService,  private formBuilder: FormBuilder, private compressorService: CompressorService,
    private sanitizer: DomSanitizer) {

    this.ownchatter$= this.chatterService.getMe()
    //this.chatteravas$ = this.chatterService.getAllAvas();

  }

  selectedFile: File;
  urls$ : Observable<any>
  onFileChanged(event) {
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();
    //   this.selectedFile = event.target.files[0];
    //   reader.readAsDataURL(event.target.files[0]); // read file as data url

    //   reader.onload = (event) => { // called once readAsDataURL is completed
    //     this.url = event.target.result;
    //   }
    // }
    
    // console.log(this.selectedFile)
  }

  

  onUpload() {
    // this.http is the injected HttpClient
    let uploadData = new FormData();
    this.compressedImages.forEach(file=>{
      
      console.log(file.name)
      uploadData.append('avatar', file, file.name);
      
    })
  this.chatterService.uploadAvatar(uploadData);
  console.log(uploadData.getAll('myFile'))


  // this.chatterService.uploadAvatar(uploadData);

  //   this.http.post('my-backend.com/file-upload', uploadData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   })
  //     .subscribe(event => {
  //       console.log(event); // handle event here
  //     });
  }

  public changeAva(event : any) :void{
      console.log(event)
      this.chatterService.changeAva(event);
  }

  ngOnInit() {
  //   this.registerForm = this.formBuilder.group({
  //     email: ['', Validators.required],
    
  //     username: ['', Validators.required],
  //     password: ['', [Validators.required, Validators.minLength(6)]]
  // });
  }

//   get f() { return this.registerForm.controls; }

//   onSubmit() {
//     this.submitted = true;

//     // stop here if form is invalid
//     if (this.registerForm.invalid) {
//         return;
//     }

//     this.loading = true;
   
  
//     this.userService.register(this.registerForm.value)
//         .pipe(first())
//         .subscribe(
//             data => {
                
//                 this.router.navigate(['/login']);
//             },
//             error => {
               
//                 this.loading = false;
//             });
// }

data: FileList;
  compressedImages = [];
  recursiveCompress = (image: File, index, array) => {
    return this.compressorService.compress(image).pipe (
      map(response => {

      //Code block after completing each compression
        console.log('compressed ' + index + image.name);
        this.compressedImages.push(response);
        return {
          data: response,
          index: index + 1,
          array: array,
        };
      }),
    );
  }

//process files for upload
  public process (event) {
  this.data = event.target.files;
  console.log('input: '  + this.data);
  const compress = this.recursiveCompress( this.data[0], 0, this.data ).pipe(
    expand(res => {
      return res.index > res.array.length - 1
        ? EMPTY
        : this.recursiveCompress( this.data[res.index], res.index, this.data );
    }),
  );
  compress.subscribe(res => {
    if (res.index > res.array.length - 1) {

      console.log(res.data)
      console.log(this.compressedImages)
      let urlsnew=[];
      this.compressedImages.forEach(file=>{
        urlsnew.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)));
      })
      this.urls$=of(urlsnew)
    //Code block after completing all compression
      console.log('Compression successful ' + this.compressedImages);
    }
  });
}

}
