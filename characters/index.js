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
      <a href="" class="card-link">
        <img src="${this.#example.image}" alt="Character's photo" class="card-image">
        <p class="card-text">${this.#example.pseudoName} ${this.#example.pseudoSurname}</p>
        <p class="card-subtext">${this.#example.speciesTypo}</p>
      </a>
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
    const inner = this.elem.closest(`.examples`);
    inner.innerHTML = '';
    for (let item of this.examples) {
      if ((this.filters.name && !item.name.includes(this.filters.name))
          || (this.filters.surname && !item.surname.includes(this.filters.surname))) {
        continue;
      }
      if (this.filters.species && item.species != this.filters.species) {
        continue;
      }
      if (this.filters.sex && item.sex != this.filters.sex) {
        continue;
      }
      if (this.filters.status && item.status != this.filters.status) {
        continue;
      }
      if (this.filters.amount && this.elem.querySelectorAll('.grid-element').length >= this.filters.amount) {
        continue;
      }
      const exampleItem = new ExampleCard(item);
      inner.prepend(exampleItem.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.#elementContent();
  }
}


class Modal {
  #elem;

  constructor() {
    this.#elem = null;
  }

  open = () => {
    this.#render();
    document.body.append(this.#elem);
    this.#onClickEvent();
    this.#escapeEvent();
  }

  close = () => {
    this.#elem.remove();
    document.removeEventListener('keydown', this.#escape);
  }

  #render = () => {
    return this.#elem = createElement(this.#template());
  }

  #template = () => {
    return `
    <div class="modal">
      <div class="modal-inner">
        <div class="modal-header">
          <span>Filters</span>
          <img src="../assets/close_24px.svg" alt="Close button icon" class="close-button">
        </div>
        <div class="modal-body">
          <select name="species" class="filter select" data-filter="species">
            <option disabled selected hidden>Species</option>
            <option value="human">Human</option>
            <option value="non-human">Non-human</option>
          </select>
          <select name="gender" class="filter select" data-filter="sex">
            <option disabled selected hidden>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="somebody">I have some bad news for you...</option>
          </select>
          <select name="status" class="filter select" data-filter="status">
            <option disabled selected hidden>Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
          </select>
          <button type="button" class="apply-button">Apply</button>
        </div>
      </div>
    </div>`;
  }

  #onClickEvent = () => {
    const button = document.querySelector('.close-button');
    button.addEventListener('click', this.close, {once: true});
    document.removeEventListener('keydown', this.#escape);
  }

  #escape = (event) => {
    if (event.code == 'Escape') {
      this.#elem.remove();
      document.body.classList.remove('is-modal-open');
    }
  }

  #escapeEvent = () => {
    document.addEventListener('keydown', this.#escape, {once: true});
  }
}

function switcher() {
  const navMenu = document.querySelector('.main-navigation');
  const navList = document.querySelector('.nav-list');
  const sectionMain = document.querySelector('.main-content');
  const pageFooter = document.querySelector('.page-footer');
  navMenu.addEventListener('click', (event) => {
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
  })
  window.addEventListener('resize', () => {
    if (document.body.clientWidth > 400) {
      navList.style.display = 'flex';
      sectionMain.style.display = '';
    } else {
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
