import { Location } from 'history';
import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';
// import WarningDialog from './WarningDialog';

const WarningDialog = (props: any) => {
  return <></>;
};

type Props = {
  when?: boolean;
  navigate: (path: string) => void;
  shouldBlockNavigation: (location: Location) => boolean;
};

export const ReactRouterPromptCustom = ({
  when,
  navigate,
  shouldBlockNavigation,
}: Props): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleBlockedNavigation = (nextLocation: Location): boolean => {
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      setModalVisible(true);
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };

  const handleConfirmNavigationClick = () => {
    setModalVisible(false);
    setConfirmedNavigation(true);
  };

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Navigate to the previous blocked location with your navigate function
      navigate(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation, navigate]);

  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />
      {/* Your own alert/dialog/modal component */}
      <WarningDialog
        open={modalVisible}
        titleText="Close without saving?"
        contentText="You have unsaved changes. Are you sure you want to leave this page without saving?"
        cancelButtonText="DISMISS"
        confirmButtonText="CONFIRM"
        onCancel={closeModal}
        onConfirm={handleConfirmNavigationClick}
      />
    </>
  );
};
