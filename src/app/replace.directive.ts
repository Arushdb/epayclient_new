import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appReplace]'
})
export class ReplaceDirective {

  constructor() { }
  @HostListener('focusout'  ,['$event']) onkeydown(e: KeyboardEvent) {
    debugger;
    const input = e.target as HTMLInputElement;
    let trimmed = input.value.replaceAll(',','');
    input.value=trimmed;
      
  }
}
