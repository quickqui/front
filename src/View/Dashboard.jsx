import React from 'react';

import { IconCardView } from './IconCardView'


const styles = {
    flex: { display: 'flex' },
    flexItem: { flex: 1 },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};


//TODO 目前只有dashboard实现了page模型。
//+ 以react-admin demo为主要依据和借鉴
export default (props) => {
    const { model } = props
    const functions = model.functions
    return (
        <div style={styles.flex}>
            {
                functions.filter((fun) => fun.base && fun.base.function === "iconCard").map((fun) => {
                    return (
                        <div style={{ ...styles.flexItem, ...styles.singleCol }}>
                            <IconCardView key={fun.name} text={fun.name} {...props} resource={fun.base.resource} filter={fun.filter} icon={fun.icon} />
                        </div>
                    )
                })
            }
        </div>
    )
};