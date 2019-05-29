// in src/customRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import { FunctionList } from './View/FunctionList';
import { FunctionEdit } from './View/FunctionEdit';
import Dashboard from './View/Dashboard';


export default function (model) {
    return (
       [ <Route exact path={"/"} key={"/"} render={(props) =>
            <Dashboard  model={model} {...props} />
        }
    /> ] .concat(
        model.functionModel.functions.map((fun) => {
            const base = fun.base
            if (base.crud === 'list')
                return (<Route exact path={"/" + fun.name} key={fun.name} render={(props) =>
                    <FunctionList functionModel={model.functionModel.functions[0]} model={model} {...props} />
                }
                />)
            if (base.crud === 'edit')
                return (<Route exact path={"/" + fun.name} key={fun.name} render={(props) => 
                    <FunctionEdit functionModel={model.functionModel.functions[0]} model={model} {...props} />
                }
                />)
            else {
                throw new Error("not supported - " + base.crud)
            }
        }))
    )
}