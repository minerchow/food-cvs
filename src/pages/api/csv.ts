// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";


interface IData{
  locationid : string,
  Applicant : string,
  FacilityType : string,
  cnn : string,
  LocationDescription : string,
  Address : string,
  blocklot : string,
  block : string,
  lot : string,
  permit : string,
  Status : string,
  FoodItems : string,
  X : string,
  Y : string,
  Latitude : string,
  Longitude : string,
  Schedule : string,
  dayshours : string,
  NOISent : string,
  Approved : string,
  Received : string,
  PriorPermit : string,
  ExpirationDate : string,
  Location : string
}
type Data = {
  result: IData[];
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const fs = require('fs');
  const csv = require('csv-parser');
  const table:Array<IData> = [];
  fs.createReadStream('./public/Mobile_Food_Facility_Permit.csv')
  .pipe(csv())
  .on('data', (data:any) => table.push(data))
  .on('end', () => {
    const datas = table.filter(item => item.locationid === req.query.name);
    // console.log(req)
    // console.log(datas)
    res.status(200).json({ result : req.query.name ? datas : table});
  });
  
}
