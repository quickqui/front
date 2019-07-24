
import React from 'react';
import {
    Show, SimpleShowLayout
} from 'react-admin'
import { showingFields } from './ShowingFields';

import * as R from "ramda";
import * as oc from 'ts-optchain'

export const ShowQuick = props => {
    const { options, resource } = props
    const { model } = options
    const entity = oc(model.entites)([]).find(R.propEq('name', resource))
    return <Show {...props}>
        <SimpleShowLayout>{
                showingFields(entity,model)
        }
        </SimpleShowLayout>
    </Show>
}