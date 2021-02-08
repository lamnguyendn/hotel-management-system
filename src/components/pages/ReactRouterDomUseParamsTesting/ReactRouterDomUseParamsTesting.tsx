import React from 'react';
import { useParams } from 'react-router-dom';

const InsideComponent = React.memo(
  (): JSX.Element => {
    const { dumpParamId, paramId } = useParams<{
      dumpParamId: string | undefined;
      paramId: string | undefined;
    }>();

    return (
      <>
        <label>React Router Dom - Use Params Hook</label>
        <label>Dump Param Id : {dumpParamId}</label>
        <label>Param Id : {paramId}</label>
      </>
    );
  }
);
// InsideComponent.displayName = 'InsideComponent';

export const ReactRouterDomUseParamsTesting = (): JSX.Element => {
  return <InsideComponent />;
};
