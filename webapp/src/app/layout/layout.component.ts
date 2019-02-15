import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, RouteConfigLoadStart } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent {
  public name = "nameCn";
  isCollapsed = false;
  isFetching = false;
  lang: string;
  menu: any[] = [
    {
      text: "Dashboard",
      link: "/dashboard",
      selected: false
    },
    {
      text: "Projects",
      link: "/projects",
      selected: false
    }
  ];

  constructor(router: Router, private _message: NzMessageService) {
    router.events.subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart)
        this.isFetching = true;
      if (!(evt instanceof NavigationEnd)) return;
      setTimeout(() => {
        this.isFetching = false;
      }, 100);
      this.setSelected(evt.urlAfterRedirects || evt.url);
    });
  }

  setSelected(url: string) {
    if (!url) return;
    this.menu.forEach(child => {
      child.selected = false;
      if (url === child.link) {
        child.selected = true;
      }
      if (child.children && child.children.length > 0) {
        console.log(child.children);
        child.children.forEach(item => {
          item.selected = false;
          if (url === item.link) {
            child.selected = true;
            item.selected = true;
          }
        });
      }
    });
  }
}
