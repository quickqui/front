import React, { createElement } from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
// import LabelIcon from '@material-ui/icons/Label';

// import Responsive from '../layout/Responsive';

const Menu = (props) => {
    const { resources, onMenuClick, logout } = props
    const model = resources[0].options.model
    
    return (
    <div>
        {resources.map(resource => (
            <MenuItemLink key={resource.name}
                to={`/${resource.name}`}
                primaryText={resource.name}
                // leftIcon={createElement(resource.icon)}
                onClick={onMenuClick}
            />
        ))}

        {
            model.functions.filter((fun)=> fun.base.crud === 'list' ).map((fun)=>{
                return <MenuItemLink key={fun.name}
                to={"/"+fun.name}
                primaryText={fun.name}
                // leftIcon={<LabelIcon />}
                onClick={onMenuClick} />
            })
        }
       
        {/* <Responsive
            small={logout}
            medium={null} // Pass null to render nothing on larger devices
        /> */}
    </div>
)}

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(Menu));