import { getNavItems, getSubMenuItemsdb } from "../../bin/db";

class NavItemService {
  public static async getAllNavItems() {
    const data = await getNavItems();
    if (data) {
      return { message: `ok`, data };
    }
    return null;
  }
}
class SubMenuService {
  public static async getSubMenu(id: any) {
    const index = id;
    const data = await getSubMenuItemsdb(index);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}

export {  NavItemService ,SubMenuService };
