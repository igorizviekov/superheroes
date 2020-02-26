import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import New from "./New";
import Spinner from "../../UI/Spinner/Spinner";
import React from "react";
configure({ adapter: new Adapter() });

describe("<New/> should render <Spinner/> if loading", () => {
  it("should be disabled if props.disabled", () => {
    const wrapper = shallow(<New />);
    expect(wrapper.find(Spinner));
  });
});
