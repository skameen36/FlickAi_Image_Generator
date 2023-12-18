import { Component } from '@angular/core';
import { OpenaiService } from '../../service/openai.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  title = 'ai-image-generator';

  constructor(private ser:OpenaiService){};

  listOfImages : any[] =
  [
    {url: "assets/images/img-16.jpeg"},
    {url: "assets/images/img-5.jpg"},
    {url: "assets/images/img-6.jpg"},
    {url: "assets/images/img-14.jpg"},
  ];

  isImageGenerating:boolean = false;
  imageone:boolean=false;

  generateImage(InputBox:HTMLInputElement,imgSize:any)
  {
    var searchInput = InputBox.value.trim();
    if(searchInput.length > 0)
    {
      this.isImageGenerating=true;
      imgSize = parseInt(imgSize);
      if(imgSize == 1)
      {
        this.imageone = true;
      }
      console.log(this.imageone);
      let backup = this.listOfImages;
      this.listOfImages = [];

      for(let index = 0; index<imgSize; index++){
      this.listOfImages.push({url : "assets/images/loader.svg"});
      }

      this.ser.GenerateImage(searchInput,imgSize).subscribe({
        next:response =>
        {
          this.listOfImages = response.data.map((item:any) =>
            {
              item.url = `data:image/jpeg;base64,${item.b64_json}`;
              return item;
            }
          )
        },
        error:() => 
        {
          this.listOfImages = backup;
          alert("Failed to generate AI images. Make sure your API key is valid.");
        },
      }).add(
        () => {
          this.isImageGenerating = false;
          this.imageone = false;
        }
      );
    }
    else
    {
      alert("Pelase specify the input field");
    }
  }
}

function handleHttpError(error: any) {
    throw new Error('Function not implemented.');
  }
