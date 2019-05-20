import React from 'react';
import { BooleanInput, TextInput ,DateInput} from 'react-admin';


export const scalarInput = (prop) => {
    // console.log(prop)

    // if(prop.source ==="__self" && (prop.record && !prop.record.__self)){
    //     console.log(prop)
    //     return scalarField({record:{'__self':prop.record},...prop})
    // }
    const { field } = prop
    // const{dataModel} = options
    if (field.typeRef.name === "Boolean") {
        return <BooleanInput {...prop} />
    }
    if (field.typeRef.name === "DateTime") {
        //FIXME DateTimeInput 有bug。‘can nof read property find of null...' 之类的。
        //可能是跟datasource 配合的bug，否则不会别处没有看到。
        //TODO 详细研究datasource。
        return <DateInput  {...prop} />
        // return <DateTimeInput
    }
    return <TextInput {...prop} />
}