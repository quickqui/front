// in App.js
import React, { Component } from 'react';
import buildOpenCrudProvider from 'ra-data-opencrud';
import { Admin, Resource ,EditGuesser} from 'react-admin';
import {ListQuick} from './ListQuick';
import {ShowQuick} from './ShowQuick'
import {EditQuick} from './EditQuick'

// import { PostCreate, PostEdit, PostList } from './posts';

// const client = new ApolloClient();
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
        const { dataProvider ,dataModel} = this.state;

        if (!dataProvider || !dataModel) {
            return <div>Loading</div>;
        }
        
        return (
            <Admin dataProvider={dataProvider}>
                {
                    dataModel.types && dataModel.types.map(t => {
                        return <Resource options={{dataModel}} name={t.name} key={t.name}
                         list={ListQuick} show={ShowQuick} edit={EditQuick}/>
                    })
                }
            </Admin>
        );
    }
}

export default App;