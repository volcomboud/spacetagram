import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ srcUrl }) => (
    <div className="video-responsive">
        <iframe
            width="900"
            height="480"
            src={srcUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

YoutubeEmbed.propTypes = {
    srcUrl: PropTypes.string.isRequired
};

export default YoutubeEmbed;
