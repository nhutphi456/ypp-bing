import { ComponentBuilder } from "../base/component";
import { Component } from "../decorator/component";
import { News } from "../models/news";

describe("Test component builder", () => {
  it("should build component", () => {
    const component = new ComponentBuilder<News>();
    component.setSelector("test-component");
    component.setTemplate("<div>{{title}} {{like}}</div>");
    component.setData({
      title: "Test component",
      like: 20,
    });
    const view = component.build()
    expect(view).toBe("<div>Test component 20</div>")
  });
});

describe("Test decorator", () => {
  it("should decorator works", () => {
    
  })
})