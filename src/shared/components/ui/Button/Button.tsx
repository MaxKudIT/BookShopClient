import { Button, type ButtonProps } from "@mui/material";
import React, { type ButtonHTMLAttributes, type FC } from "react";
import { buttonStyles } from "./muiStyles";
import type { IconType } from "react-icons";


const ButtonForPage: FC<ButtonProps> = ({children, ...props}) =>
  {
    return (
      <div>
        <Button {...props} sx={buttonStyles}>{children}</Button>
      </div>
    )
  }

  export default ButtonForPage;