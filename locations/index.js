function createElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  };

function switcher() {
  const navMenu = document.querySelector('.main-navigation');
  const navList = document.querySelector('.nav-list');
  const filterList = document.querySelector('.adaptive');
  const filters = document.querySelectorAll('.op-adaptive');
  document.addEventListener('click', (event) => {
    if (event.target === navMenu) {
      if (!navList.style.display || navList.style.display === 'none') {
        navList.style.display = 'inline';
      } else {
        navList.style.display = 'none';
      }
    }
    if (event.target === filterList) {
        filters.forEach((item) => {
          if (!item.style.display || item.style.display === 'none') {
              item.style.display = 'inline';
            } else {
              item.style.display = 'none';
            }
        });
      }
  })
}

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
      <a href="" class="card-link">${this.#example.pseudo} ${this.#example.dimenso}</a>
      <p class="card-text">${this.#example.typo}</p>
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
      if (this.filters.name && item.name != this.filters.name) {
          continue;
        }
      if (this.filters.dimension && item.dimension != this.filters.dimension) {
          continue;
        }
      if (this.filters.type && item.type != this.filters.type) {
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

