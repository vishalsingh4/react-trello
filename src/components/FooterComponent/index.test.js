import React from "react";
import { shallow } from "enzyme";

import FooterComponent from "./";

describe("FooterComponent", () => {
  let wrapper;
  let props = {};
  beforeEach(() => {
    wrapper = shallow(<FooterComponent {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Footer component", () => {
    expect(wrapper.find("FooterComponent")).toBeDefined();
  });

  it("should render footer text", () => {
    expect(wrapper.find(".footer-component").props().children).toEqual(
      "All Right reserved © Trello App"
    );
  });
});
