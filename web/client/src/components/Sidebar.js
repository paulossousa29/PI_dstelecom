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

import "../pages/Painel.css"

const Sidebar = () => {
  return (
      <CDBSidebar textColor="#333" backgroundColor="#f0f0f0" >
        <CDBSidebarHeader height="100vh" prefix={<i className="fa fa-bars" />}>
          <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ width: 150, height: 70 }} src={logo} alt="Logo" />
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu id="myMenu">

            <CDBSidebarMenuItem href="/relatorios" icon="th-large">Relatórios</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">Pedidos</CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="chart-line" iconType="solid">Estatísticas</CDBSidebarMenuItem>
            
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              className="sidebar-btn-wrapper"
              style={{ padding: '20px 5px'}}
            >
              Sair da Sessão
            </div>
          </CDBSidebarFooter>
        
      </CDBSidebar>
  )
};

export default Sidebar;