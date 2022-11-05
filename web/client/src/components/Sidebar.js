import React from 'react';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarSubMenu,
  CDBSidebarFooter,
  CDBBadge,
  CDBContainer,
} from 'cdbreact';

import logo from '../assets/dstelecomlogo.png'
import { Link } from 'react-router-dom';

import "../pages/Painel.css"


const Sidebar = () => {
  return (
      <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
        <CDBSidebarHeader  height="100%" prefix={<i className="fa fa-bars" />}>
          <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ width: 150, height: 70 }} src={logo} alt="Logo" />
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu id="myMenu">
            <CDBSidebarMenuItem href="/relatorios" icon="th-large">Relatórios</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Pendentes</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="chart-line" iconType="solid">
              Estatísticas
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
  )
};

export default Sidebar;