const navMenu = document.querySelector('.main-navigation');
const navList = document.querySelector('.nav-list');
const sectionMain = document.querySelector('.main-content');
const pageFooter = document.querySelector('.page-footer');

function createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  };

class ExampleCard {
  elem;
  #example = {};
  constructor(example) {
    this.elem = null;
    this.#example = example || this.#example;
    this.#render();
  }
  #template () {
    return (
    `<div class="grid-element">
      <a href="${this.#example.link}" class="card-link">${this.#example.name}</a>
      <p class="card-subtext">${this.#example.date}</p>
      <p class="card-text">${this.#example.code.toUpperCase()}</p>
     </div>`
    );
  }
  #render () {
    this.elem = createElement(this.#template());
  }
}

class ExampleGrid {
  elem;

  constructor(examples) {
    this.examples = examples;
    this.elem = null;
    this.filters = {};
    this.#render();
  }

  #render() {
    this.elem = createElement(
      `<section class="examples"></section>`
    );
    this.#elementContent();
  }

  #elementContent() {
    let inner = this.elem.closest(`.examples`);
    inner.innerHTML = '';
    for (let item of this.examples) {
      if (this.filters.code && !item.code.includes(this.filters.code)
      || this.filters.name && !item.name.toLowerCase().includes(this.filters.name)) {
        continue;
        }
      if (this.filters.amount && this.elem.querySelectorAll('.grid-element').length >= this.filters.amount) {
        continue;
      }
      let exampleItem = new ExampleCard(item);
      inner.append(exampleItem.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.#elementContent();
  }
}

function hideNavBar(event) {
  if (!navList.style.display || navList.style.display === 'none') {
    navMenu.classList.add('menu-open');
    navList.style.display = 'inline';
    sectionMain.style.display = 'none';
  } else {
    navMenu.classList.remove('menu-open');
    navList.style.display = 'none';
    sectionMain.style.display = '';
  }
  pageFooter.style.display = sectionMain.style.display;
}

function switcher() {
  if (document.body.clientWidth <= 400) {
    navMenu.addEventListener('click', hideNavBar);
  }
  window.addEventListener('resize', () => {
    if (document.body.clientWidth > 400) {
      navMenu.removeEventListener('click', hideNavBar)
      navList.style.display = 'flex';
      sectionMain.style.display = '';
    } else {
      navMenu.addEventListener('click', hideNavBar);
      if (navMenu.classList.contains('menu-open')) {
        navList.style.display = 'inline';
        sectionMain.style.display = 'none';
      } else {
        navList.style.display = 'none';
        sectionMain.style.display = '';
      }
    }
    pageFooter.style.display = sectionMain.style.display;
  });
}