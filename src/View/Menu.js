import React, { Component ,createElement} from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

import * as icons  from '@material-ui/icons'

import { withRouter } from 'react-router-dom';
import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    getResources
} from 'react-admin';


import SubMenu from '../Component/SubMenu';
import {filesToTreeNodes} from '../Util'
import * as _ from 'lodash';

class Menu extends Component {


    state = {
        // menuCatalog: false,
        // menuSales: false,
        // menuCustomers: false,
    };

   

    handleToggle = menu => {
        this.setState(state => ({ [menu]: !state[menu] }));
    };

    toTree = model => {
        const withPath = _.compact(model.functions.map((fun) => {
            if (fun.menuPath) return {
                path: fun.menuPath,
                object: fun
            }
            else return undefined
        }))
        console.log(withPath)
        const tree = filesToTreeNodes(withPath)
        console.log(tree)
        return tree
    }

    toElement = (treeNode,open,onMenuClick) => {
        if (treeNode.isDirectory) {
            return <SubMenu
                handleToggle={() => this.handleToggle(treeNode.pathString)}
                isOpen={this.state[treeNode.pathString]}
                sidebarIsOpen={open}
                name={treeNode.name}
                icon={<MoreHoriz />}
            >
                {
                    treeNode.children.map(this.toElement,open,onMenuClick)
                }
            </SubMenu>

        } else {
            return <MenuItemLink
                to={"/"+treeNode.object.name}
                primaryText={treeNode.object.name}
                leftIcon={createElement( icons[treeNode.object.icon || 'Label'])}
                onClick={onMenuClick}
            />
        }
    }

    render() {
        const { onMenuClick, resources,open } = this.props;
        console.log(this.props)
        if(!resources){
            return <div></div>
        }
        const model = resources[0].options.model

        const functionTree = this.toTree(model)

        return (
            <div>
                <DashboardMenuItem onClick={onMenuClick} />
                {
                    functionTree.map((_)=>this.toElement(_,open,onMenuClick))
                }
              
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
    resources: getResources(state),
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {}
    ),
    translate
);

export default enhance(Menu);
