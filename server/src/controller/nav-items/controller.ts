import asyncHandler from "../../helper/async-handler";
import routes from "../../routes/public";
import  { SubMenuService ,NavItemService} from "./service";
import BuildResponse from "../../modules/response/app_response";

routes.get(
  "/navItem",
  asyncHandler(async function getNavItems(req: any, res: any) {
    const data = await NavItemService.getAllNavItems();
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
  })
);

routes.get('/submenu/:id',
  asyncHandler(async function getSubMenuItems(req: any, res: any) {
    const id = +req.params.id
    const data = await SubMenuService.getSubMenu(id);
    const buildResponse = BuildResponse.get(data);
    return res.status(200).json(buildResponse)
  }))
