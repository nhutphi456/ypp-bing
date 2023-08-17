import { Model } from "../classes/model";

export interface INews {
  title: string;
  source: string;
  like: number;
}
export class News extends Model<INews>{
  constructor() {
    super()
  }
}
