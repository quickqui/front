import React from 'react'
import { TextField, BooleanField, DateField } from 'react-admin'

export const scalarField = (prop) => {
    // console.log(prop)

    // if(prop.source ==="__self" && (prop.record && !prop.record.__self)){
    //     console.log(prop)
    //     return scalarField({record:{'__self':prop.record},...prop})
    // }
    const { property } = prop
    // const{dataModel} = options
    if (property.type === "Boolean") {
        return <BooleanField {...prop} />
    }
    if (property.type === "DateTime") {
        return <DateField {...prop} />
    }
    return <TextField {...prop} />
}