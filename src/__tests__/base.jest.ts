import { Controller } from "../classes/controller";
import { Model } from "../classes/model";
import { View } from "../classes/view";

interface IItem {
  name: string;
}

describe("test base classes", () => {
  let item: Model<IItem>,
    itemView: View<IItem>,
    itemComponent: Controller<IItem>;

  beforeAll(() => {
    const template = (data: IItem) => `<div>${data.name}</div>`;

    item = new Model();
    itemView = new View(template);
    itemComponent = new Controller(item, itemView);
  });

  it("should bind data into view", () => {
    const html = itemComponent.bindData({
      name: "Nike Shoes",
    });

    expect(html).toBe("<div>Nike Shoes</div>");
  });
});
