import {Component, Input, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {LayoutInstance} from './layout-instance';
import {Cart} from '../cart/cart';
import {CartManageLauncher} from '../order/cart-manage/cart-manage-launcher';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  @Input()
  title: string;
  visible = false;

  constructor(private appTitle: Title, private _instance: LayoutInstance, public cart: Cart,
              public orderProcessLauncher: CartManageLauncher) {
    this.visible = this._instance.showSidebar;
  }

  ngOnInit(): void {
    if (!this.title) {
      this.title = 'Application';
    }

    this.appTitle.setTitle(this.title);
  }

  toggle() {
    this.visible = !this.visible;
    this._instance.showSidebar = !this._instance.showSidebar;
  }

  processCart() {
    this.orderProcessLauncher.launch();
  }
}
