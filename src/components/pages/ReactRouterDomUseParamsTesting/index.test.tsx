import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter, Route, Router } from 'react-router-dom';
import { getUserConfirmation } from '../../../states/store';
import { ReactRouterDomUseParamsTesting } from './ReactRouterDomUseParamsTesting';

jest.useFakeTimers();
jest.setTimeout(1000000);

const renderInRouter = (ui: React.ReactNode, route: string, initialEntries = [route]) => {
  const history = createMemoryHistory({ getUserConfirmation });

  const memoryRouter = React.createElement(MemoryRouter, { initialEntries }, ui);

  const router = React.createElement(Router, { history }, memoryRouter);

  return render(router);
};

test('Uploading file should show its name', async () => {
  // It's working
  const URL = '/admin/private/notice/:paramId?';
  const URL_REPLACE_WITH_PARAM_ID = URL.replace(':paramId', 'ID123');
  const { getByText } = renderInRouter(
    <Route path={URL}>
      <ReactRouterDomUseParamsTesting />
    </Route>,
    URL_REPLACE_WITH_PARAM_ID
  );

  // It's working too
  // const URL = '/admin/private/notice/:paramId?';
  // const URL_REPLACE_WITH_PARAM_ID = URL.replace(':paramId', 'ID123');
  // const { getByText } = render(
  //   <MemoryRouter initialEntries={[URL_REPLACE_WITH_PARAM_ID]}>
  //     <Route path={URL}>
  //       <ReactRouterDomUseParamsTesting />
  //     </Route>
  //   </MemoryRouter>
  // );

  await waitFor(() => expect(getByText(/ID123/)).toBeInTheDocument());
});
