// in App.js
import React, { Component } from 'react';
import buildOpenCrudProvider from 'ra-data-opencrud';
import { Admin, Resource, ShowGuesser, ListGuesser } from 'react-admin';
import { PostList } from './Post'
import { UserList } from './User'
import {ListQuick} from './ListQuick';

// import { PostCreate, PostEdit, PostList } from './posts';

// const client = new ApolloClient();
 class App extends Component {
    constructor() {
        super()
        this.state = { dataProvider: null, dataModel: null };
    }
    componentDidMount() {
        buildOpenCrudProvider({ clientOptions: { uri: 'http://localhost:4466' } })
            .then(dataProvider => this.setState({ dataProvider }));
        fetch("http://localhost:1111").then(res => res.json())
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
                        return <Resource options={{dataModel}} name={t.name} key={t.name} list={ListQuick} show={ShowGuesser} />
                    })
                }
            </Admin>
        );
    }
}

export default App;