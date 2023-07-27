import React, { ReactNode } from "react";
import Header from "./header/Header";
import Settings from "./Settings";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="bg-white dark:bg-gray-800">
    <Settings />
    <Header />
    <div className="layout">{props.children}</div>
  </div>
);

export default Layout;
