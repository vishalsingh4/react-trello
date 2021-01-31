import React from "react";
import { Provider } from "react-redux";
import { shallow } from "enzyme";

import store from "../../store";

import LoginPage from "./";

describe("Login Page component", () => {
  let wrapper;
  let props = {};
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <LoginPage {...props} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render Login Page", () => {
    expect(wrapper.find("LoginPage")).toBeDefined();
  });
});
