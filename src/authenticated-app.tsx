import React from "react";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { Dropdown, Menu, Button } from "antd";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { useState } from "react";
import { ProjectPopover } from "components/project-popover";
import { useDispatch } from "react-redux";
export const AuthenticatedApp = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <PageHead></PageHead>
      <Main>
        {/* <ProjectListScreen /> */}
        <Router>
          <Routes>
            <Route path={"/"} element={<ProjectListScreen />}></Route>
            <Route path={"/projects"} element={<ProjectListScreen />}></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
            {/* <Navigate to={'/projects'} ></Navigate> */}
          </Routes>
        </Router>
        <ProjectModal></ProjectModal>
        {/* <ProjectModal
          projectModalOpen={projectModalOpen}
          onClose={() => setProjectModalOpen}
        ></ProjectModal> */}
      </Main>
    </Container>
  );
};

const PageHead = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <span>Logo</span>
        </ButtonNoPadding>
        <ProjectPopover></ProjectPopover>
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logou"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  "height:100vh"grid-gap: 10rem;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div``;
const Main = styled.main``;
const Nav = styled.nav``;

const Aside = styled.aside``;

const Footer = styled.footer``;

const PageHeader = styled.header`
  height: 6rem;
`;

// const Main = styled.main`
// height: calc(100vh - 6rem)
// `
