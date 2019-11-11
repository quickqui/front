import React from 'react';

import { IconCardView } from './IconCardView'
import { Function } from '@quick-qui/model-defines/dist/function';





//TODO 目前只有dashboard实现了page模型。
//+ 以react-admin demo为主要依据和借鉴
export default (props: { model: any; }) => {


    const { model } = props
    let functions: Function[] = model.functions


    // const page = model?.pages?.find((page: any) => page?.name === 'dashboard')
    let gride: number = 3
    // if (page) {
    //     gride = page.gride || 3
    //     functions = page.places?.map((place: any) => place.function)
    //         ?.map((functionName: any) => model.functions.find((fun: any) => functionName === fun.name)) ?? functions
    // }

    const gridStyle = {
        container: {
            display: 'grid',
            'grid-template-columns': 'auto '.repeat(gride).trim()
        },
        item: {
            marginTop: '2em'
        }
    }

    return (
        <div style={gridStyle.container}>
            {
                //TODO 增加其他支持
                functions.filter((fun) => fun.base && fun.base.function === "iconCard").map((fun) => {
                    return (
                        <div style={gridStyle.item}>
                            <IconCardView key={fun.name} text={fun.name} {...props} resource={fun.base.resource} filter={fun.filter} icon={fun.icon} />
                        </div>
                    )
                })
            }
        </div>
    )
};