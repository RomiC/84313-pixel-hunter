import getElementFromTemplate from './create-DOM.js';

export default class AbstractView {
  get template() {
    throw new Error(`get template must be define for view`);
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {
    throw new Error(`method bind must be define for view`);
  }

  getMarkup() {
    this._element = this.render();
    this.bind();
  }

  get element() {
    if (!this._element) {
      this.getMarkup();
    }

    return this._element;
  }
}
