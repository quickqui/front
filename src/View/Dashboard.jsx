import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import { Grid, Button, } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import { IconCardView } from './IconCardView'


const FunctionButton = ({ functionModel }) => {
    return (
        <Button
            color='primary'
            component={Link}
            to={{
                pathname: "/" + functionModel.name,
            }}
        >
            {functionModel.name}
            <Icon>{functionModel.icon}</Icon>
        </Button>
    )
};

export default (props) => {
    const { model } = props
    const funs = model.functions
    return (
        <Card>
            <Title title="Welcome to QuickQui" />
            {/* <CardContent>
                <Grid container spacing={32}>
                    {

                        funs.filter((fun) => fun.menuPath).map((fun) => {
                            return (
                                <Grid key={fun.name} item xs>
                                    <Card>
                                        <CardContent><FunctionButton functionModel={fun} />
                                            {/* TODO 更多dashboard内容，todo，message，图表... */}
                                        {/* </CardContent>
                                    </Card>
                                </Grid>) */}
                        {/* })
                    } </Grid> */}

            {/* </CardContent> */} 
            {
                funs.filter((fun) => fun.base && fun.base.function === "iconCard").map((fun) => {
                    return (
                        <IconCardView  key={fun.name} text={fun.name} {...props} resource={fun.base.resource} filter={fun.filter} icon={fun.icon}/>
                    )
                })
            }
        </Card>)

};