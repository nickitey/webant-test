const navMenu = document.querySelector('.main-navigation');
const navList = document.querySelector('.nav-list');
const sectionMain = document.querySelector('.main-content');
const pageFooter = document.querySelector('.page-footer');

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
  if (document.body.clientWidth <= 445) {
    navMenu.addEventListener('click', hideNavBar);
  }
  window.addEventListener('resize', () => {
    if (document.body.clientWidth > 445) {
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