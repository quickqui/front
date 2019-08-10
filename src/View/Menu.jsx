import HomeIcon from '@material-ui/icons/Home';
import LabelIcon from '@material-ui/icons/Label';
import React, { createElement } from 'react';
import { getResources, MenuItemLink, Responsive } from 'react-admin';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as icons  from '@material-ui/icons'




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
                model.functions.filter((fun) => fun.base.function === 'list').map((fun) => {
                    return <MenuItemLink key={fun.name}
                        to={"/" + fun.name}
                        primaryText={fun.name}
                        leftIcon={createElement( icons[fun.icon || 'Label'])} //|| <LabelIcon />}
                        // leftIcon={<LabelIcon />}
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