import { makeAutoObservable } from 'mobx';

class UI {
  // 左侧展示隐藏
  collapsed = false;
  constructor() {
    makeAutoObservable(this);
  }
  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
  reset() {
    this.collapsed = false;
  }
}

export default new UI();
