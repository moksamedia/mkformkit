/**
 * Created by cantgetnosleep on 10/30/16.
 */

import pretty from 'pretty';


let stripHtmlComments = (html) => {
  return html.replace(/<!--(.*?)-->/gm, "");
};

exports.stripHtmlComments = stripHtmlComments;

exports.prettyPrintHtmlFromWrapper = (wrapper, strip = true) => {
  if (strip) {
    console.log(pretty(stripHtmlComments(wrapper.html())));
  }
  else {
    console.log(pretty(wrapper.html()));
  }
};

exports.simulateChange = (component, value) => {
  component.simulate('change', {target: {value: value}});
};
