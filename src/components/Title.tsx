import React from "react"
import "styles/Title.scss"

interface ITitle {
  children: React.ReactNode;
}

function Title({ children }: ITitle) {
  return <h1 className="title">{children}</h1>;
}

export default Title;
