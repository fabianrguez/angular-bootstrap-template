import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAnimate]'
})
export class AnimateDirective {

  constructor(private element: ElementRef,
              private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const top: number = this.element.nativeElement.getBoundingClientRect().top;
    const winTop: number = this.element.nativeElement.offsetHeight;

    if (top < winTop + 600) {
      this.renderer.addClass(this.element.nativeElement, 'slide');
    }
  }
}
