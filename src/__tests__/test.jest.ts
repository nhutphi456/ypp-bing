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

describe("test parent component", () => {
  let items: Model<IItem[]>,
    itemsView: View<IItem[]>,
    itemsComponent: Controller<IItem[]>;

  beforeAll(() => {
    const template = (data: IItem) => `<div>${data.name}</div>`;
    const parentTemplate = (data: IItem[]) =>
      `<div><div>List Item</div>${data.map((item) => template(item))}</div>`;

    items = new Model();
    itemsView = new View(parentTemplate);
    itemsComponent = new Controller(items, itemsView);
  });

  it("should render child component", () => {
    const items = [
      {
        name: "Nike Shoes",
      },
      {
        name: "Pants",
      },
    ];

    const html = itemsComponent.bindData(items);
    expect(html).toContain("<div>Nike Shoes</div>");
    expect(html).toContain("<div>Pants</div>");
  });
});
