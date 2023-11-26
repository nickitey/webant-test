function switcher() {
  const navMenu = document.querySelector('.main-navigation');
  const navList = document.querySelector('.nav-list');
  const sectionMain = document.querySelector('.main-content');
  const pageFooter = document.querySelector('.page-footer');
  const backButton = document.querySelector('.back-button');
  console.log(backButton)
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
    backButton.style.display = sectionMain.style.display;
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
    backButton.style.display = sectionMain.style.display;
  });
}