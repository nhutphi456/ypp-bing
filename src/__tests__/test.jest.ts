import { HtmlParser } from "../helper/htmlParser";

describe("Test dom", () => {
  let htmlParser: HtmlParser;
  let testObj;

  beforeAll(() => {
    htmlParser = new HtmlParser();
    testObj = {
      items: [
        {
          id: 1,
          name: "item 1",
        },
        {
          id: 2,
          name: "item 2",
        },
      ],
    };
  });
  it("should dom work", () => {
    const template = `
            <news *ngFor="let item of items" data="item">
                hello
            </news>
        `;
    const element = htmlParser.parseToHtmlElement(template);
    const childElement = element.firstChild as HTMLElement;
    const attributes = childElement.attributes;

    const ngForExpression = attributes.getNamedItem("*ngFor")?.value;
    const words = ngForExpression.split(" ");
    const list = words[3];
    testObj[list].forEach((item) => {
      const newElement = childElement.cloneNode(true) as HTMLElement;
      newElement.setAttribute("data", JSON.stringify(item));
      newElement.removeAttribute("*ngFor");
      element.appendChild(newElement);
      // element.removeChild(childElement)
    });

    /**
     * const words = ngForExpression.split(" ")
     * list = words[3]
     * instance[list].forEach(item => {
     *
     * })
     */
    expect(element.innerHTML).toBe("");
    expect(1).toBe(1);
  });
});

`
<div>
    {{item.image.imageUrl}}
    <child-component data="item"></child-component>
    <div *ngFor="let item of items">{{itemf}}</div>
</div>
`
describe("test component instance", () => {
    it("should works", () => {
        class News {
            title = "news 1"
            item: {
                image: {
                    imageUrl: ""
                }
            }
        }
        
        const news = new News()
        for(const property in news) {
            const a = news[property]
            console.log(a)
        }

        expect(1).toBe(1)
    })
})
