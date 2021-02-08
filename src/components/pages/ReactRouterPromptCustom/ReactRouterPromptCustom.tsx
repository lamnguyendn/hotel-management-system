/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, Prompt } from 'react-router-dom';
import './index.scss';

const modalRoot = document.getElementsByTagName('body')[0];

const Modal = ({
  setOpen,
  allowTransitionCallback,
}: {
  setOpen: (value: React.SetStateAction<boolean>) => void;
  allowTransitionCallback: any;
}): JSX.Element => {
  return ReactDOM.createPortal(
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setOpen(false)}>
          &times;
        </span>
        <p>Some text in the Modal..</p>
        <button
          type="button"
          onClick={() => allowTransitionCallback && allowTransitionCallback(true)}
        >
          Redirect...
        </button>
      </div>
    </div>,
    modalRoot
  );
};

const __trigger: symbol = Symbol.for('__PreventTransitionPrompt_123');

const PreventTransitionPrompt = (props: {
  when: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const { when, setOpen } = props;

  const [allowTransitionCallback, setAllowTransitionCallback] = useState<any>(null);

  const show = useCallback((cb) => {
    setAllowTransitionCallback(() => cb);
  }, []);

  useEffect(() => {
    window[(__trigger as unknown) as number] = show as any;
    return () => {
      delete window[(__trigger as unknown) as number];
    };
  }, [show]);

  useEffect(() => {
    if (when && allowTransitionCallback) {
      (allowTransitionCallback as any)(false);
    }
  }, [allowTransitionCallback, when]);

  const handleTransition = useCallback(() => {
    return Symbol.keyFor(__trigger);
  }, []);

  return (
    <>
      <Prompt when={when} message={handleTransition as any} />
      {when && <Modal setOpen={setOpen} allowTransitionCallback={allowTransitionCallback} />}
    </>
  );
};

const Form = () => {
  const [isChanged, setChanged] = useState(false);
  const [open, setOpen] = useState(false);

  const clickOutSide = useCallback(
    (event) => {
      const { target } = event;
      const ariaLabel = (target as any).getAttribute('aria-label');
      if (ariaLabel === 'Link' && isChanged) {
        setOpen(true);
      }
      // event.preventDefault();
    },
    [isChanged]
  );

  useEffect(() => {
    window.addEventListener('click', clickOutSide, true);
    return () => {
      window.removeEventListener('click', clickOutSide, true);
    };
  }, [clickOutSide]);

  return (
    <>
      <PreventTransitionPrompt when={open} setOpen={setOpen} />
      <Link to="/test1" aria-label="Link">
        Test 1
      </Link>
      <br />
      <input
        placeholder="type something to block transitions"
        onChange={() => {
          setChanged(true);
        }}
      />
    </>
  );
};

export const ReactRouterPromptCustom = (): JSX.Element => <Form />;
