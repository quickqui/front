import React from 'react'
import { TextField, BooleanField, DateField } from 'react-admin'

export const scalarField = (prop) => {
    // console.log(prop)

    // if(prop.source ==="__self" && (prop.record && !prop.record.__self)){
    //     console.log(prop)
    //     return scalarField({record:{'__self':prop.record},...prop})
    // }
    const { field } = prop
    // const{dataModel} = options
    if (field.typeRef.name === "Boolean") {
        return <BooleanField {...prop} />
    }
    if (field.typeRef.name === "DateTime") {
        return <DateField {...prop} />
    }
    return <TextField {...prop} />
}