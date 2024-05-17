import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = navItems;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    setTimeout(() => {
      this.resetElementStyles();
      this.highlightSideMenu();
    }, 500);
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.resetElementStyles();
          this.highlightSideMenu();
        }, 500);
      }
    });
  }

  highlightSideMenu() {
    const curUrl = this.router.url;
    const from = this.activatedRoute.snapshot.queryParams['from'];
    this.navItems.forEach((item, idx) => {
      const title = document.getElementsByTagName('c-sidebar-nav-group')[idx]?.getElementsByTagName('a')[0].text;
      if (item.url === curUrl || item.url === from) {
        this.updateElement(idx);
      } else {
        item.children?.forEach((child, childIdx) => {
          if (child.url === curUrl || child.url === from) {
            this.updateElement(idx, childIdx);
          }
        })
      }
    })
  }

  updateElement(idx: number, childIdx: number = 0) {
    if (idx <= 0) return;
    const navGrp = document.getElementsByTagName('c-sidebar-nav-group')[idx - 1];
    navGrp.classList.add('show');
    const sideNav = document.getElementsByTagName('c-sidebar-nav-group')[idx - 1].getElementsByTagName('c-sidebar-nav')[0];
    sideNav.setAttribute('style', 'height: auto; display: block;')
    const a = document.getElementsByTagName('c-sidebar-nav-group')[idx - 1]?.getElementsByTagName('c-sidebar-nav')[0]?.getElementsByTagName('c-sidebar-nav-link')[childIdx]?.getElementsByTagName('a')[0];
    if (!a) return;
    a.setAttribute('style', 'color: rgb(0 0 0) !important; background: rgb(255 255 255 / 85%) !important;');
  }

  resetElementStyles() {
    const navLinks = document.getElementsByTagName('c-sidebar-nav-link');
    for (let i = 0; i < navLinks.length; i++) {
      const element = navLinks[i];
      const a = element.getElementsByTagName('a')[0];
      a.setAttribute('style', 'color: #ffffff99; background: #00000000')
    }
    const navGroup = document.getElementsByTagName('c-sidebar-nav-group');
    for (let i = 0; i < navGroup.length; i++) {
      const element = navGroup[i];
      element.classList.remove('show');
      const a = element.getElementsByTagName('c-sidebar-nav')[0];
      a.setAttribute('style', 'height: 0px')
    }
  }

}
