import React from 'react';

import { Layout } from 'react-admin';
import MyError from './MyError';

const MyLayout = (props) => <Layout {...props} error={MyError} />;

export default MyLayout;