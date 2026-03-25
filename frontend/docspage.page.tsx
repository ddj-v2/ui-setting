import { addPage, NamedPage, AutoloadPage } from '@hydrooj/ui-default';

addPage(new AutoloadPage('docspage_init', () => {
  const navList = document.getElementsByClassName('nav__list nav__list--main clearfix')[0];
  const navItems = navList?.children;
  
  const newElement = document.createElement('li');
  newElement.className = 'nav__list-item';
  const link = document.createElement('a');
  link.href = '/homepage/';
  link.className = 'nav__item';
  link.textContent = '程設班官網';
  newElement.appendChild(link);
  navList?.insertBefore(newElement, navItems?.[3]);
}));
