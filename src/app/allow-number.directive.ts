import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllowNumber]'
})
export class AllowNumberDirective {

  regexpstr='^[0-9]+$';

  constructor() { }

@HostListener('keypress',['$event']) onkeypress(event:KeyboardEvent){
return new RegExp(this.regexpstr).test(event.key);
}

}
