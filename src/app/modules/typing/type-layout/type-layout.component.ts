import { Component, OnInit } from '@angular/core';
import { ApiLocalService } from 'src/app/api-load.service';
import { Passages } from './Ipassages';

@Component({
  selector: 'app-type-layout',
  templateUrl: './type-layout.component.html',
  styleUrls: ['./type-layout.component.scss']
})
export class TypeLayoutComponent implements OnInit {

  time: number = 601;
  display: string = '10:00';
  interval: string | number | undefined | any;
  typedWordsLength: number = 0;
  passage: string = 'The symptoms of bladder cancer are often Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sapiente saepe, possimus natus aperiam laborum mollitia qui? Ad, impedit! Est ullam possimus iste fugiat, eveniet sint aliquid vero omnis odit unde minus nam similique perspiciatis sunt commodi, ipsum inventore dolores deleniti molestiae rem! Iusto vitae voluptates id voluptatem, officia ducimus consequatur? Quas iusto quos assumenda exercitationem aliquid voluptates quae voluptas enim culpa odit. Officiis beatae rerum ut natus explicabo! Minima neque voluptatibus vitae possimus dolorum quos sed explicabo consequuntur, repellat veritatis deleniti, autem rem, architecto quas. Minima ratione maiores repudiandae distinctio quod, ducimus necessitatibus similique sint in beatae aliquam dolor, quia esse! Aut deleniti doloremque totam praesentium voluptas sint obcaecati molestiae optio deserunt voluptates. Quidem laudantium sint velit nulla doloribus, accusamus maxime enim ipsum vel, maiores rem repudiandae eveniet necessitatibus dicta saepe quos omnis debitis deserunt suscipit eligendi! Nesciunt necessitatibus beatae inventore quam aspernatur repudiandae obcaecati molestias commodi tempora nemo assumenda, impedit ex, similique hic ratione ullam modi ut excepturi? Perspiciatis adipisci nam assumenda quis harum expedita atque, quia nobis. Neque ipsum suscipit ducimus fuga eligendi laudantium similique accusamus expedita officia magnam maxime praesentium repudiandae quae dolores itaque voluptate, at officiis natus nesciunt ex ea. Quaerat doloremque dolores possimus fuga ad alias ab itaque voluptatem autem sapiente, molestiae inventore, laboriosam harum facere minus velit laudantium aperiam modi similique minima dolorum vero suscipit sed blanditiis. Expedita iure dignissimos obcaecati eveniet cum vitae nam adipisci veritatis provident fuga reiciendis minus sed voluptatem voluptatibus, temporibus quas alias. Reiciendis qui corporis numquam. Fuga eos at provident consectetur reiciendis saepe commodi nihil. Provident quo quibusdam temporibus, odit odio impedit quidem nihil beatae. Sequi veritatis numquam deserunt. Quaerat quidem neque commodi natus error vel. Cumque dolore illo culpa quae, vitae ipsa magni at, explicabo, inventore assumenda exercitationem quos autem nostrum nam! Iure laboriosam voluptas aut sapiente, corporis alias doloremque, sed facilis magnam consectetur dolor ipsum quaerat, ea cupiditate. Illum mollitia tenetur quis expedita doloremque est magni provident adipisci quibusdam non?';
  typedWords: string;

  showResultFlag:boolean;

  selectedPassage: any;
  selectedPassageName: any;

  accuracy: any;
  wpm: number;
  passages: any[]=Passages;

  constructor(private api: ApiLocalService) { }

  ngOnInit(): void {
    this.download()
  }

  download(){
    this.api.downloadpassage(this.selectedPassage).subscribe((res: any)=>{
      this.passage=res.passage;
    })
  }

  updatePassage(){
    const name= this.passages.filter((res: any)=> res.location == this.selectedPassage)
  this.selectedPassageName= name[0].name;
  this.download();
  this.resetEveryThing();
  }

  startTimer() {
    this.resetEveryThing();
    //console.log("=====>");
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.pauseTimer();
        console.log("time completed")
        this.calculateResult();
        // this.time++;
        //call stop test
      } else {
        this.time--;
      }
      this.display = this.transform(this.time)
    }, 1000);
  }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  resetEveryThing() {
    this.time = 601;
    this.showResultFlag = false;
    this.pauseTimer();
    this.display= '10:00';
    this.typedWords='';
  }

  stopTest() {
  //  this.resetEveryThing();
    this.calculateResult();
  }

  calculateResult() {
    this.showResultFlag = true;
     const typedPassage= this.typedWords.split(/\s/);
     const originalPassage= this.passage.split(/\s/);

     var correct=0;
     var incorrect=0
     typedPassage.forEach((ele,index)=>{
       if(ele=== originalPassage[index]){
        correct++;
       }else{
        incorrect++;
       }
     })

     const total=(correct/(correct+incorrect))*100;
     this.accuracy= Math.round(total).toFixed(2);
     this.wpm=Math.ceil(this.countWords(this.typedWords)/10);

  }

  execute() {
    this.typedWordsLength = this.countWords(this.typedWords);
  }


  countWords(count: string) {
    var words = count.split(/\s/);
    return words.length;
  }


  



}
