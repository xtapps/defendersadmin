import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = navItems;

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.highlightSideMenu()
    }, 500);
    // this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationEnd) {
    //     setTimeout(() => {
    //       this.highlightSideMenu()
    //     }, 500);
    //   }
    // });
  }

  highlightSideMenu() {
    const curUrl = this.router.url;
    this.navItems.forEach((item, idx) => {
      const title = document.getElementsByTagName('c-sidebar-nav-group')[idx]?.getElementsByTagName('a')[0].text;
      if (item.url === curUrl) {
        this.updateElement(idx);
      } else {
        item.children?.forEach(child => {
          if (child.url === curUrl) {
            this.updateElement(idx);
          }
        })
      }
    })
  }

  updateElement(idx: number) {
    if (idx <= 0) return;
    const navGrp = document.getElementsByTagName('c-sidebar-nav-group')[idx - 1];
    navGrp.classList.add('show');
    const sideNav = document.getElementsByTagName('c-sidebar-nav-group')[idx - 1].getElementsByTagName('c-sidebar-nav')[0];
    sideNav.setAttribute('style', 'height: auto; display: block;')
  }

}
