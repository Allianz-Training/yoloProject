import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
// import { read } from 'fs';

@Component({
  selector: 'app-insure',
  templateUrl: './insure.component.html',
  styleUrls: ['./insure.component.css']
})
export class InsureComponent implements OnInit {
  selectedFile: File
  insure:Insure;
  str:string;
  imgUrl:string ="./assets/default.png"
  fileToUpload :File = null;

  posts: any[];
  form: FormGroup;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({      
      idcard: ['',[Validators.required,Validators.minLength(13)]],
      firstName:  ['',Validators.required], 
      lastName:  ['',Validators.required], 
      dateofbirth:  ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      gender:  ['',Validators.required],
      phone:  ['',Validators.required], 
      address:  ['',Validators.required],
      pictureURL:  ['',Validators.required],
      brand:  ['',Validators.required],

    });
  }
  ngOnInit(): void {
    this.insure = new Insure();
    this.loadPost();
  }

  handleFileInput(file: FileList){
    this.fileToUpload =file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imgUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload)
  }

  loadPost() {
    this.posts = [];
    this.httpClient
      // .get('https://jsonplaceholder.typicode.com/posts')
      .get('http://localhost:8080/users/')
      .subscribe(result => {
        this.posts = result as any[];
      });
  }
  addPost() {
    const newPost = this.form.value;
    console.log(newPost)
    this.httpClient
      // .post('https://jsonplaceholder.typicode.com/posts', newPost)
      .post('http://localhost:8080/users/', newPost)
      .subscribe(result => {
        this.form.reset();
        alert(result);
        // alert('Add Post Success !');
        // this.loadPost();
      });
    }


  onSubmit(value){
    window.alert('success')
  }


  onFileChanged(event) {
      this.selectedFile = event.target.files[0]
    }

    onUpload() {
      // upload code goes here
    }
}

class Insure{
  firstname:string;
  lastname:string;
  email:string;
  phone:string;
  address:string;

  imgUrl:string[];
  option:number;

}
