import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import { Grid, Button, } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import { IconCardView } from './IconCardView'


const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

export default (props) => {
    const { model } = props
    const funs = model.functions
    return (
        <div style={styles.flex}>
            <div style={styles.leftCol}>
                {
                    funs.filter((fun) => fun.base && fun.base.function === "iconCard").map((fun) => {
                        return (
                            <div style={styles.flex}>
                                <IconCardView key={fun.name} text={fun.name} {...props} resource={fun.base.resource} filter={fun.filter} icon={fun.icon} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};