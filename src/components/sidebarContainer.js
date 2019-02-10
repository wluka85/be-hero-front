import React, { Component } from 'react';
import Sidebar from "react-sidebar";
import {connect} from "react-redux";
import {handleChangeSidebarOpen} from "../actions/sidebarActions";
import SidebarContent from './sidebarContent';

class SidebarContainer extends Component {
  render() {
    const { sidebarOpen, handleClose } = this.props;

    return (
      <Sidebar
        rootClassName="sidebar"
        sidebar={ <SidebarContent></SidebarContent> }
        children=""
        open={sidebarOpen}
        onSetOpen={handleClose}
        styles={{ sidebar: { background: "white", maxWidth: 270, width: '30%' } }}
      >
      </Sidebar>
    );
  }
};

const mapStateToProps = (state) => {
  console.log(state.sidebarReducer.sidebarOpen)
  return {
      sidebarOpen: state.sidebarReducer.sidebarOpen,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      handleClose: () => { dispatch(handleChangeSidebarOpen()) },
  }
};

export default SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);