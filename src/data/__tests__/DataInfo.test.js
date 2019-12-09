import React from 'react'

import {render, fireEvent} from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import DataInfo from "../DataInfo";
import '@testing-library/jest-dom/extend-expect'
import {waitForElement} from "@testing-library/dom";
import {addCreateTextRangePolyfill} from "../../utils/TestPolyfill";

test('DataInfo - shows data', async () => {

    addCreateTextRangePolyfill();

    const location = {search: ''};
    const {getByText} = render(<DataInfo location={location}/>);
    const element = await waitForElement(() => getByText(/Data Info/i))
    expect(element).toBeInTheDocument();

});