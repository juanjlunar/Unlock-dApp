export function payloadFormater(payload, identifier, type = null) {
    let data = {};
    let ids = [];

    if (typeof payload === 'object' && Array.isArray(payload)) {
        payload.forEach(singleData => {
            data[singleData[identifier]] = singleData;
            ids.push(singleData[identifier]);
        });
    } else if (type && type === 'object' && typeof payload === 'object') {
        Object.keys(payload).forEach(key => {
            data[payload[key][identifier]] = payload[key];
            ids.push(payload[key][identifier]);
        });
    } else {
        data[payload[identifier]] = payload;
        ids.push(payload[identifier]);
    }
    
    return {
        data,
        ids
    }
}
export function storeGlobalPeers(state, payload) {
    window.__peers = payload.ids;
}
export function storeGlobalSinglePeer(state, payload) {
    window.__peers = [...payload.ids, ...state.peerIds];
}