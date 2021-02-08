import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Router } from 'react-router';
import { REACT_ROUTER_PROMPT_CUSTOM_PAGE_PATH } from '../../../routes/constants';
import configureStore, { getUserConfirmation } from '../../../states/store';
import { RoomListPage } from '../Room';
import { ReactRouterPromptCustom } from './ReactRouterPromptCustom';

jest.useFakeTimers();

jest.setTimeout(1000000);

test('Uploading file should show its name', async () => {
  const history = createMemoryHistory({ getUserConfirmation });
  history.push(REACT_ROUTER_PROMPT_CUSTOM_PAGE_PATH);
  const { container, getByPlaceholderText, getByText } = render(
    <Provider store={configureStore()}>
      <Router history={history}>
        {/* <MemoryRouter
          getUserConfirmation={getUserConfirmation}
          initialEntries={[REACT_ROUTER_PROMPT_CUSTOM_PAGE_PATH]}
        > */}
        <Route path={REACT_ROUTER_PROMPT_CUSTOM_PAGE_PATH}>
          <ReactRouterPromptCustom />
        </Route>
        <Route path="/test1">
          <RoomListPage />
        </Route>
        {/* </MemoryRouter> */}
      </Router>
    </Provider>
  );

  await waitFor(() => {
    expect(getByPlaceholderText('type something to block transitions')).toBeInTheDocument();
  });
  const inputEl = getByPlaceholderText('type something to block transitions');

  fireEvent.change(inputEl, { target: { value: '123' } });

  await waitFor(() => {
    expect(getByText('Test 1')).toBeInTheDocument();
  });

  const link = getByText('Test 1');

  fireEvent.click(link, { capture: true, detail: 1, view: window, isTrusted: true, eventPhase: 2 });
  // userEvent.click(link);

  // act(() => {
  //   const clickEvent = new MouseEvent('click', {
  //     bubbles: true,
  //     cancelable: true,
  //     composed: true,
  //     view: window,
  //   });

  //   console.log(clickEvent.eventPhase);
  //   console.log(clickEvent.CAPTURING_PHASE);
  //   console.log(clickEvent.BUBBLING_PHASE);
  //   console.log(clickEvent.AT_TARGET);

  //   link.dispatchEvent(clickEvent);
  // });

  await waitFor(() => expect(getByText('Some text in the Modal..')).toBeInTheDocument());
  await waitFor(() => expect(getByText('Redirect...')).toBeInTheDocument());

  // fireEvent.click(getByText('Redirect...'));

  // await waitFor(() => expect(getByText('Room List')).toBeInTheDocument());
});
