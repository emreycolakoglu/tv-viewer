import React from "react";
import YouTube from "react-youtube";
import { selectChannel } from "../store/reducers/selectedChannelStore";
import { connect } from "react-redux";

const TVPlayer = (props) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      fs: 1,
    },
  };

  function _onReady(event) {
    // access to player in all event handlers via event.target
    //event.target.pauseVideo();
  }

  return (
    <div className="tv-player">
      <div className="embed-responsive embed-responsive-16by9">
        {props.videoId && (
          <YouTube videoId={props.videoId} opts={opts} onReady={_onReady} />
        )}
      </div>
    </div>
  );
};

const ReduxedTVPlayer = (props) => {
  return <TVPlayer videoId={props.selectedChannel} />;
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    selectedChannel: state.selectedChannel,
  };
};

const mapDispatchToProps = {
  selectChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxedTVPlayer);
