// in App.js
import React, { Component } from 'react';
import buildOpenCrudProvider from 'ra-data-opencrud';
import { Admin, Resource } from 'react-admin';
import { ListQuick } from './View/ListQuick';
import { ShowQuick } from './View/ShowQuick'
import { EditQuick } from './View/EditQuick'
import { CreateQuick } from './View/CreateQuick';
import { Model } from './Model';
import Menu from './View/Menu';
import customRoutes from './customRoutes';
import authProvider from './authProvider';


class App extends Component {
    constructor() {
        super()
        this.state = { dataProvider: null, dataModel: null };
    }
    componentDidMount() {
        buildOpenCrudProvider({ clientOptions: { uri: '/prisma' } })
            .then(dataProvider => this.setState({ dataProvider }));
        fetch("/model-server/model").then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ model: new Model(data) })
            })
    }

    render() {
        const { dataProvider, model } = this.state;

        if (!dataProvider || !model) {
            return <div>Loading</div>;
        }

        return (
            <Admin customRoutes={customRoutes(model)} menu={Menu} dataProvider={dataProvider} authProvider={authProvider}>
                {
                    model.types && model.types.map(t => {
                        return <Resource options={{ model }} name={t.name} key={t.name}
                            list={ListQuick} show={ShowQuick} edit={EditQuick} create={CreateQuick} />
                    })
                }
            </Admin>
        );
    }
}

export default App;