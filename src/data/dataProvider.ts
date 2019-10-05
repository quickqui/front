
import { DataProvider, chain } from '@quick-qui/data-provider'
import axios from 'axios';
import { env } from '../Env';
import {dataProvider as d} from 'extend/LogDataProvider'

const backeEndDataProvider: DataProvider = (type, resource, params) => {
    const json = { type, resource, params }
    return axios.post('/app/dataProvider', json).then(r => r.data)

}
const frontEndDataProvider: DataProvider = (() => {
    // const name = 'LogDataProvider'
    // // const path = `${env.extendPath}/${name}`
    // const path = `../${name}`
    // console.log(path)
    const re = d
    console.log(re)
    return re
})()

export const dataProvider = chain(frontEndDataProvider, backeEndDataProvider)