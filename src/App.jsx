// in App.js
import React, { Component} from 'react';
import { Admin, Resource } from 'react-admin';
import { ListQuick } from './View/ListQuick';
import { ShowQuick } from './View/ShowQuick'
import { EditQuick } from './View/EditQuick'
import { CreateQuick } from './View/CreateQuick';
import { Model } from './Model/Model';
import Menu from './View/Menu';

import customRoutes from './customRoutes';
import authProvider from './authProvider';

import {model} from './Model/Model'

import {dataProvider} from './data/dataProvider'



class App extends Component {
    constructor() {
        super()
        this.state = { dataProvider: null, model: null };
    }
    componentDidMount() {
        Promise.resolve(dataProvider)
            .then(dataProvider => this.setState({...this.state, dataProvider }));
        model.then(res => res.json())
            .then(data => {
                this.setState( { ...this.state, model: new Model(data) })
            })
    }

    render() {
        const { dataProvider, model } = this.state;

        if (!dataProvider || !model) {
            return <div>Loading</div>;
        }
        return (
            <Admin customRoutes={customRoutes(model)} menu={Menu} 
            dataProvider={dataProvider} 
            // authProvider={authProvider}
            >
                { 
                    model.entities && model.entities.map((p) => {
                        return <Resource options={{ model }} name={p.name} key={p.name}
                            list={ListQuick} show={ShowQuick} edit={EditQuick} create={CreateQuick} />
                    })
                }
            </Admin>
        );
    }
}

export default App;