"use strict";

import React from "react";
import Image from "../Common/Image";
import Util from "../../util/utils";
import AppConstants from "../../constants/AppConstants";

export default function SearchResultThumbnail({ icon }) {
  return (
    <div className="thumbnail-container">
      <Image
        src={Util.buildProfileIconUrl(icon)}
        defaultImage={AppConstants.DEFAULT_SUMMONER_ICON_PATH}
        alt={"summoner icon"}
      />
    </div>
  );
}