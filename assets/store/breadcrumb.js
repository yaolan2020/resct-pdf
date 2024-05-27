import { makeAutoObservable } from 'mobx';

class Breadcrumb {
  //面包屑的数据
  values = [];

  constructor() {
    makeAutoObservable(this);
  }

  setValue = (index, crumbArray) => {
    if (index === 0) {
      this.values.length = 0;
    }
    if (crumbArray) {
      if (Array.isArray(crumbArray)) {
        if (this.values.length === 0) {
          index = 0;
        } else {
          this.values.splice(index);
        }
        crumbArray.map((v, i) => {
          this.values[index + i] = v;
        });
      } else {
        this.values[index] = crumbArray;
      }
    }
  };

  getValues() {
    return this.values.slice();
  }
}

export default new Breadcrumb();
