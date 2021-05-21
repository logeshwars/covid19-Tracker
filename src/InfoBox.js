import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./Infobox.css";

function InfoBox({
  y,
  g,
  r,
  isgreen,
  title,
  cases,
  total,
  isgray,
  isred,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infobox ${isgreen && "infobox_selected"}
      ${isred && "infobox_red"}
      ${isgray && "infobox_gray"}
      `}
    >
      <CardContent>
        <Typography className="infobox_title" color="textSecondary">
          {title}
        </Typography>
        <h2
          className={`infobox_all ${g && "infobox_recovered"}
      ${r && "infobox_cases"}
      ${y && "infobox_deaths"}
      `}
        >
          {cases}
        </h2>
        <Typography className="infobox_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
