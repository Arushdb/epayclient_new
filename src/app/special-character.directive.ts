import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSpecialCharacter]'
})
export class SpecialCharacterDirective {
  regexpstr='^[a-zA-Z0-9 @_/]*$';

  constructor() { }
  @HostListener('keypress',['$event']) onkeypress(event:KeyboardEvent){
    return new RegExp(this.regexpstr).test(event.key);
    }
    
}
