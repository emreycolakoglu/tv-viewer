function channelStore(state = "", action) {
  switch (action.type) {
    case SELECT_CHANNEL:
      return action.videoId;
    default:
      return state;
  }
}

export default channelStore;

export const SELECT_CHANNEL = "SELECT_CHANNEL";

export function selectChannel(value) {
  return {
    type: SELECT_CHANNEL,
    videoId: value,
  };
}
