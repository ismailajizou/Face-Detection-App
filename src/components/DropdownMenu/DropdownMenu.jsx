import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link} from 'react-router-dom';
import { toggleModal } from '../../redux/modal/modal-actions';


const DropdownMenu = ({hidden,dispatch}) => {

    return ( 
        <div 
        style={hidden ? {display: 'none'} : { backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
        className="list ba b--transparent shadow-5 br1 flex flex-column absolute right-2">
            <span 
            onClick={() => dispatch(toggleModal(true))}
            className="pa2 bb f4 link dim black pointer">
                Profile
            </span>
            <span className="pa2">
            <Link 
            to='/signin' 
            style={{outline: 'none'}} 
            className='f4 link dim black pa3 pointer'>Sign Out</Link> 
            </span>
        </div>
     );
}

const mapStateToProps = ({menu: {hidden}}) => ({hidden});

export default withRouter(
    connect(mapStateToProps)(DropdownMenu));