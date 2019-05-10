import React from 'react'

import { BooleanInput,TextInput } from 'react-admin';

export const scalarInput = (prop)=>{
    // console.log(prop)

    // if(prop.source ==="__self" && (prop.record && !prop.record.__self)){
    //     console.log(prop)
    //     return scalarField({record:{'__self':prop.record},...prop})
    // }
    const{field}=prop
    // const{dataModel} = options
    if(field.typeName.name==="Boolean"){
        return <BooleanInput {...prop}/>
    }
    return <TextInput {...prop}/>
}