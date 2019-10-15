import React from 'react';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Report';
import History from '@material-ui/icons/History';
import { Title } from 'react-admin';

const MyError = ({
    error,
    errorInfo,
    ...rest
}) => (
    <div>
        <Title title="Error" />
        <h1><ErrorIcon /> Something Went Wrong </h1>
        <div>A client error occurred and your request couldn't be completed.</div>
        {process.env.NODE_ENV !== 'production' && (
            <details>
                <h2>{error.toString()}</h2>
                {errorInfo.componentStack}
            </details>
        )}
        <div>
            <Button
                variant="raised"
                icon={<History />}
                onClick={() => window.history.go(-1)}
            >
                Back
            </Button>
        </div>
    </div>
);

export default MyError;