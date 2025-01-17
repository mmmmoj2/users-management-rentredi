import { Breadcrumb, BasePage } from '../constants/pages';

export const getBreadcrump = (page: BasePage) => {
  let node: BasePage | undefined = page;
  const breadcrump: Breadcrumb[] = [];
  while (node) {
    breadcrump.unshift({ text: page.label, href: page.href });
    node = page.parent?.();
  }
  return breadcrump;
};
