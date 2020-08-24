import React, { useEffect } from "react";
import channels from "../data/channels.json";
import { selectChannel } from "../store/reducers/selectedChannelStore";
import { connect } from "react-redux";

const ChannelList = (props) => {
  useEffect(() => {}, []);

  return (
    <div className="channel-list-wrapper">
      {channels.channels.map((c, i) => (
        <div
          className="channel-item"
          key={i}
          onClick={() => {
            props.selectChannel(c.id);
          }}
        >
          <img src={c.logo} />
          <span>{c.name}</span>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    selectedChannel: state.selectedChannel,
  };
};

const mapDispatchToProps = {
  selectChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
