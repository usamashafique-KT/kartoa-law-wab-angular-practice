import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRoundBlock]'
})
export class RoundBlockDirective {
  @Input() appRoundBlock: string;
  constructor(
    private elmRef: ElementRef,
    private renderer: Renderer2) { }
    
  ngOnInit() {
    let roundVal = `${this.appRoundBlock}`;
    this.renderer.setStyle(this.elmRef.nativeElement, 'border-radius', roundVal);
  }

}
