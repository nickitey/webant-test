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

function contentMaker() {
  window.addEventListener('resize', () => {
    const examples = document.querySelector('.examples');
    if (document.body.clientWidth <= 800) {
      examples.innerHTML = 'hello,world!';
    } else {
      examples.innerHTML = 'it\'s so fuckin\' big!';
    }
  });
}
