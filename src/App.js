// in App.js
import React, { Component } from 'react';
import buildOpenCrudProvider from 'ra-data-opencrud';
import { Admin, Resource ,ShowGuesser,ListGuesser} from 'react-admin';
import {PostList} from './Post'
import {UserList} from './User'

// import { PostCreate, PostEdit, PostList } from './posts';

// const client = new ApolloClient();

class App extends Component {
    constructor() {
        super();
        this.state = { dataProvider: null };
    }
    componentDidMount() {
        buildOpenCrudProvider({ clientOptions: { uri: 'http://localhost:4466' }})
            .then(dataProvider => this.setState({ dataProvider }));
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return <div>Loading</div>;
        }

        return (
            <Admin dataProvider={dataProvider}>
                <Resource name="Post" list={ListGuesser} show={ShowGuesser}/>
                <Resource name="User" list={ListGuesser} show={ShowGuesser}/>
            </Admin>
        );
    }
}

export default App;