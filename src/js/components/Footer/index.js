"use strict";

import React from "react";

// Footer
export default function Footer(props) {
  return (
    <footer>
      <span>
        &copy;
				<a href="mailto:teemu.virta@pp2.inet.fi" target="_top"> Teemu Virta </a>
        <span className="year">{new Date().getFullYear()}</span>
      </span>
    </footer>
  );
}