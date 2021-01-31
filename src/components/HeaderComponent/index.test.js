import React from "react";
import { shallow } from "enzyme";
import Typography from "@material-ui/core/Typography";

import HeaderComponent from "./";

describe("HeaderComponent", () => {
  let wrapper;
  let props = {};
  beforeEach(() => {
    wrapper = shallow(<HeaderComponent {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Header component", () => {
    expect(wrapper.find("HeaderComponent")).toBeDefined();
  });

  it("should render variant h3", () => {
    expect(wrapper.find(Typography).props().variant).toEqual("h3");
    expect(wrapper.find(Typography).props().gutterBottom).toBeTruthy();
  });

  it("should render header text", () => {
    expect(wrapper.find(Typography).props().children).toEqual(
      "Trello React App"
    );
  });
});
