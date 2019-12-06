// in App.js
import React, { Component } from "react";
import { Admin, Resource } from "react-admin";

import * as _ from "lodash";

import { ModelWrapped } from "./Model/Model";
import Menu from "./View/Menu";
import { onInit } from "./life/frontLife";

import customRoutes from "./customRoutes";
import authProvider from "./authProvider";

import { model } from "./Model/Model";

import { dataProvider as dp } from "./data/dataProvider";

class App extends Component {
  constructor() {
    super();
    this.state = { dataProvider: null, model: null };
  }
  componentDidMount() {
    onInit().then(() => {
      dp.then(dataProvider =>
        this.setState({ ...this.state, dataProvider: dataProvider })
      );
      model.then(data => {
        this.setState({
          ...this.state,
          model: new ModelWrapped(data)
        });
      });
    });
  }

  render() {
    const { dataProvider, model } = this.state;

    if (!dataProvider || !model) {
      return <div>Loading</div>;
    }

    const functions = model.functionModel?.functions ?? [];
    const resources = _(functions.map(fun => fun.resource))
      .compact()
      .uniq()
      .value();
    return (
      <Admin
        customRoutes={customRoutes(model)}
        menu={Menu}
        dataProvider={dataProvider[0]}
        customSagas={dataProvider[1]}

        // authProvider={authProvider}
      >
        {resources.map(resource => {
          console.log(resource);
          return (
            <Resource options={{ model }} name={resource} key={resource} />
          );
        })}
      </Admin>
    );
  }
}

export default App;
