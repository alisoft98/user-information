import asyncHandler from "../../helper/async-handler";
import routes from "../../routes/public";
import { Request, Response } from "express";
import PatientService from "./services";
import BuildResponse from "../../modules/response/app_response";

routes.post(
  `/admin/add-patient`,
  asyncHandler(async function addPatient(req: Request, res: Response) {
    const formData = req.body;
    const data = await PatientService.addPatient(formData);
    const buildResponse = BuildResponse.get(data);
    if (buildResponse) {
      return res.status(200).json(buildResponse);
    }
    return formData
  })
);
