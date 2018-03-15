import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

declare let $: any;

@Directive({
  selector: '[appActiveLink]'
})
export class ActiveLinkDirective implements OnInit{

  @Input() linkId: string;

  private elementToFind: HTMLElement;

  constructor(private element: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.elementToFind = document.getElementById(this.linkId);
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    if (this.element.nativeElement.contains(event.target)) {
      this.addActiveClassToElement();
    }
  }

  private removeActiveClassFromOtherElements() {
    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName('nav-item');
    for (let index = 0; index < elements.length; index++) {
      elements.item(index).classList.remove('active');
    }
  }

  private addActiveClassToElement() {
    this.removeActiveClassFromOtherElements();
    this.renderer.addClass(this.element.nativeElement, 'active');
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.isElementVisible();
    if (window.scrollY === 0) {
      this.removeActiveClassFromOtherElements();
    }
  }

  private isElementVisible() {
    const scrollHeight = document.documentElement.scrollTop.valueOf();
    if (scrollHeight >= this.elementToFind.offsetTop - 71) {
      this.addActiveClassToElement();
    }
  }
}
