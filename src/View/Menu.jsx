import React from 'react';
import { createElement } from 'react'

import { connect } from 'react-redux';
import { MenuItemLink, getResources, Responsive } from 'react-admin';
import { withRouter } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';
import HomeIcon from '@material-ui/icons/Home'


const Menu = (props) => {
    const { resources, onMenuClick, logout } = props
    const model = resources[0].options.model

    return (
        <div>
            <MenuItemLink key={'home'} to={'/'} primaryText={'Home'} leftIcon={<HomeIcon />} onClick={onMenuClick} />
            {resources.map(resource => (
                <MenuItemLink key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={resource.name}
                    leftIcon={resource.icon ? createElement(resource.icon) : <LabelIcon />}
                    onClick={onMenuClick}
                />
            ))}

            {
                //TODO 实现menuPath暨子菜单
                //TODO 实现Badge。作为list的一部分。
                model.functions.filter((fun) => fun.base.crud === 'list').map((fun) => {
                    return <MenuItemLink key={fun.name}
                        to={"/" + fun.name}
                        primaryText={fun.name}
                        leftIcon={<LabelIcon />}
                        onClick={onMenuClick} />
                })
            }

            <Responsive
                small={logout}
                medium={null} // Pass null to render nothing on larger devices
            />
        </div>
    )
}

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(Menu));