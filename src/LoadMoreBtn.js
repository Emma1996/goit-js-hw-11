export default class LoadMoreBtn {
  constructor(selector, isHidden) {
    this.button = document.getElementById(selector);

    isHidden && this.hide();
  }

  getButton() {
    return this.button;
  }

  hide() {
    this.button.style.display = 'none';
  }

  show() {
    this.button.style.display = '';
  }
}
