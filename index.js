import Emitter from 'component-emitter';
import el from 'el-component';

export default class Pager extends Emitter {
  #total = 0;
  #current = 0;

  constructor(el) {
    super();
    this.el = el;
    el.addEventListener('click', this.onclick.bind(this));
  }

  total(t) {
    this.#total = t;
    return this;
  }

  onclick(e) {
    const target = e.target || e.srcElement;
    const page = Array.prototype.indexOf.call(this.el.children, target);
    if (page < 0) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.select(page);
  }

  select(page, opts) {
    if (page === this.#current) {
      return;
    }
    Array.prototype.forEach.call(this.el.children, (a, i) => {
      a.className = i === page ? 'active' : 'inactive';
    });
    this.#current = page;
    if (!opts?.silent) {
      this.emit('show', this.#current);
    }
    return this;
  }

  render() {
    const html = new Array(this.#total);
    for (let i = 0; i < this.#total; i++) {
      html[i] = el(i !== this.#current ? 'a.inactive' : 'a.active');
    }
    this.el.innerHTML = html.join('');
    return this;
  }
}
