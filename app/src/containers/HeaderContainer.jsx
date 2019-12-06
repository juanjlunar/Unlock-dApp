// import { withRouter } from 'react-router';
import { connect } from 'react-redux';
// component
import Header from '../components/Header';


export default connect(
    state => {
        return {
            contractError: state.contractReducer.error
        };
    }, 
    null
)(Header);