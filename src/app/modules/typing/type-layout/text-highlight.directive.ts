import {
    Directive,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    SecurityContext,
    SimpleChanges
} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ignoreElements } from 'rxjs/operators';

@Directive({
    selector: "[highlight]"
})
export class HighlightDirective implements OnChanges {
    @Input("highlight") isHiglight: boolean;
    @Input() customClasses = "";
    @Input() currentTextCounter: number = 0;
    @Input() typedWords: string;

    @HostBinding("innerHtml")
    content: string | null;
    constructor(private el: ElementRef, private sanitizer: DomSanitizer) { }

    ngOnChanges(changes: SimpleChanges) {
       

      
        if (this.el?.nativeElement ) {
            if("isHiglight" in changes){
                console.log(this.isHiglight)
                const text = (this.el.nativeElement as HTMLElement).textContent;
                //if (this.searchTerm === "") {
                this.content = text;
               
    
            }

            if(!this.isHiglight){
                return;
            }

            if ("typedWords" in changes || "currentTextCounter" in changes || "isHiglight" in changes) {
                const text = (this.el.nativeElement as HTMLElement).textContent;
                //if (this.searchTerm === "") {
                this.content = text;
                // } else {
                // let regex = new RegExp(
                //   this.searchTerm,
                //   this.caseSensitive ? "g" : "gi"
                // );
                // let newText = text.replace(regex, (match: string) => {
                //   return `<mark class="highlight ${this.customClasses}">${match}</mark>`;
                // });



                let textSplitted: string[] = text ? text.split(" ") : [];
                if (textSplitted) {
                    textSplitted[this.currentTextCounter] = `<span class=" ${this.customClasses}">${textSplitted[this.currentTextCounter]}</span>`



                    if (this.typedWords) {
                        const typedWordsSplit = this.typedWords.split(" ");
                        for (var i = 0; i < this.currentTextCounter; i++) {
                            if (textSplitted[i] == typedWordsSplit[i]) {
                                textSplitted[i] = `<span class="text-success">${textSplitted[i]}</span>`
                            } else {
                                textSplitted[i] = `<span class="text-danger">${textSplitted[i]}</span>`
                            }

                        }


                    }




                    let newText = textSplitted.join(" ");
                    const sanitzed = this.sanitizer.sanitize(
                        SecurityContext.HTML,
                        newText
                    );





                    this.content = sanitzed;
                }

            }
        }
    }
}

