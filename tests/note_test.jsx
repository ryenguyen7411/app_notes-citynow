import React from 'react';
import {
    renderIntoDocument
} from 'react-addons-test-utils';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import assert from 'assert';
import Note from '../app/components/Note';

describe('Note', function () {
    it('renders children', function () {
        const test = 'test';
        const NoteContent = wrapInTestContext(Note);
        const component = renderIntoDocument(
            <NoteContent id="demo">{test}</NoteContent>
        );

        assert.equal(component.props.children, test);
    });

    it('can be tested with the testing backend', () => {
        // Render with the test context that uses the test backend
        const BoxContext = wrapInTestContext(Box);
        const root = TestUtils.renderIntoDocument(<BoxContext name='test' />);

        // Obtain a reference to the backend
        const backend = root.getManager().getBackend();

        // Test that the opacity is 1
        let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
        expect(div.props.style.opacity).toEqual(1);

        // Find the drag source ID and use it to simulate the dragging operation
        const box = TestUtils.findRenderedComponentWithType(root, Box);
        backend.simulateBeginDrag([box.getHandlerId()]);

        // Verify that the div changed its opacity
        div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
        expect(div.props.style.opacity).toEqual(0.4);

        // See other backend.simulate* methods for more!
    });
});

// https://gaearon.github.io/react-dnd/docs-testing.html
function wrapInTestContext(DecoratedComponent) {
    return DragDropContext(TestBackend)
    class TestContextContainer extends React.Component {
        render() {
            return <DecoratedComponent {...this.props} />;
        }
    }

    return TestContextContainer;
}