import UI from '../config/ui.config';

export function showTab(e) {
  e.preventDefault();
  if (!e.target.classList.contains('active')) {
    const link = e.target;
    const href = link.hash.replace(/#/, '');
    UI.tabs.forEach((tab) => {
      tab.classList.remove('active');
    });
    UI.tabsContent.forEach((tabContent) => {
      tabContent.classList.remove('active', 'show');
      if (tabContent.id === href) tabContent.classList.add('active', 'show');
    });
    link.classList.add('active');
  }
}
