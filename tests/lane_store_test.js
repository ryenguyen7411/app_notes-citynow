import assert from 'assert';
import LaneStore from '../app/stores/LaneStore';
import LaneActions from '../app/actions/LaneActions';
import alt from '../app/libs/alt';
import expect from 'expect';

alt.addStore('LaneStore', LaneStore);

describe('LaneStore', () => {
    beforeEach(() => {
        alt.flush();
    });

    it('create lane', () => {
        const lane = 'Lane';

        LaneActions.create({
            lane
        });

        const state = alt.stores.LaneStore.getState();

        expect(state.lanes.length).toEqual(1);
        expect(state.lanes[0].lane).toEqual(lane);
    });

    it('update lane', () => {
        const lane = 'Lane';
        const lane_updated = 'Lane updated';

        LaneActions.create({
            lane
        });

        const lane_created = alt.stores.LaneStore.getState().lanes[0];
        LaneActions.update({ ...lane_created,
            lane: lane_updated
        })

        const state = alt.stores.LaneStore.getState();

        expect(state.lanes.length).toEqual(1);
        expect(state.lanes[0].lane).toBe(lane_updated);
    });

    it('delete lane', () => {
        const lane = 'Lane';

        LaneActions.create({
            id: 1234,
            lane
        });

        const store = alt.stores.LaneStore;
        expect(store.getState().lanes.length).toEqual(1);

        const lane_created = alt.stores.LaneStore.getState().lanes[0];
        LaneActions.delete(lane_created.id);

        expect(store.getState().lanes.length).toEqual(0);
    })
})