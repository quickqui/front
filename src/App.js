// in App.js
import React, { Component } from 'react';
import buildOpenCrudProvider from 'ra-data-opencrud';
import { Admin, Resource } from 'react-admin';
import { ListQuick } from './View/ListQuick';
import { ShowQuick } from './View/ShowQuick'
import { EditQuick } from './View/EditQuick'
import { CreateQuick } from './View/CreateQuick';


class App extends Component {
    constructor() {
        super()
        this.state = { dataProvider: null, dataModel: null };
    }
    componentDidMount() {
        buildOpenCrudProvider({ clientOptions: { uri: '/prisma' } })
            .then(dataProvider => this.setState({ dataProvider }));
        fetch("/model-server/dataModel").then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ dataModel: data })
            })
    }

    render() {
        const { dataProvider, dataModel } = this.state;

        if (!dataProvider || !dataModel) {
            return <div>Loading</div>;
        }

        return (
            <Admin dataProvider={dataProvider}>
                {
                    dataModel.types && dataModel.types.map(t => {
                        return <Resource options={{ dataModel }} name={t.name} key={t.name}
                            list={ListQuick} show={ShowQuick} edit={EditQuick} create={CreateQuick} />
                    })
                }
            </Admin>
        );
    }
}

export default App;