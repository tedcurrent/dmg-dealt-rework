"use strict";

import React from "react";
import ErrorPage from "../Error";

export default function NotFoundPage(props) {
  return <ErrorPage errorNumber={404} errorMessage={"Page Not Found"} />;
}