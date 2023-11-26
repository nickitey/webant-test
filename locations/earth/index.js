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
      <a href="${this.#example.link}" class="card-link">
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
      const exampleItem = new ExampleCard(item);
      inner.prepend(exampleItem.elem);
    }
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
    if (document.body.clientWidth > 510) {
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
