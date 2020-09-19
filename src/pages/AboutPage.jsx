import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Button, Spinner } from "@blueprintjs/core";

const useStyles = createUseStyles({
  refreshButton: {
    float: "right",
  },
  spinner: {
    paddingTop: "2rem",
  },
});

export const AboutPage = () => {
  const classes = useStyles();
  const [html, setHtml] = useState("");

  const fetchAbout = async () => {
    const cachedText = window.localStorage.getItem("aboutPageText");

    if (!cachedText) {
      const response = await fetch(
        "https://raw.githubusercontent.com/leoncvlt/electron-react-app/master/README.md"
      );
      const markdown = await response.text();

      const markdownResponse = await fetch("https://api.github.com/markdown/raw", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: markdown,
      });
      const pageHtml = await markdownResponse.text();
      window.localStorage.setItem("aboutPageText", pageHtml);
      setHtml(pageHtml);
    } else {
      setHtml(cachedText);
    }
  };

  const handleRefresh = () => {
    fetchAbout();
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return html ? (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Button className={classes.refreshButton} icon="refresh" onClick={() => handleRefresh()}>
        Refresh text
      </Button>
    </>
  ) : (
    <Spinner className={classes.spinner} value={"Fetching README..."}></Spinner>
  );
};
