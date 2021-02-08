import { lazy } from 'react';
import {
  ENZYME_WITH_FILE_INPUT_PAGE_PATH,
  FILE_PAGE_PATH,
  FORM_PAGE_PATH,
  IMMUTABILITY_HELPER_PAGE_PATH,
  LIST_PAGE_PATH,
  REACT_DATE_PICKER_WITH_TESTING_LIBRARY_PAGE_PATH,
  REACT_HOOK_FORM_PAGE_PATH,
  REACT_HOOK_FORM_TEST_INPUT_FILE_PAGE_PATH,
  REACT_HOOK_FORM_YUP_PAGE_PATH,
  REACT_ROUTER_PROMPT_CUSTOM_PAGE_PATH,
  VIDEO_PAGE_PATH,
} from './constants';

export const privatePage = [
  {
    path: FILE_PAGE_PATH,
    component: lazy(() =>
      import('../components/pages/File').then(({ FilePage }) => ({
        default: FilePage,
      }))
    ),
  },
  {
    path: FORM_PAGE_PATH,
    component: lazy(() =>
      import('../components/pages/Form').then(({ FormPage }) => ({
        default: FormPage,
      }))
    ),
  },
  {
    path: LIST_PAGE_PATH,
    component: lazy(() =>
      import('../components/pages/Room').then(({ RoomListPage: ListPage }) => ({
        default: ListPage,
      }))
    ),
  },
  {
    path: VIDEO_PAGE_PATH,
    component: lazy(() =>
      import('../components/pages/Video').then(({ VideoPage }) => ({
        default: VideoPage,
      }))
    ),
  },
  {
    path: REACT_HOOK_FORM_PAGE_PATH,
    component: lazy(() =>
      import('../components/pages/ReactHookForm').then(({ ReactHookFormPage }) => ({
        default: ReactHookFormPage,
      }))
    ),
  },
  {
    path: REACT_HOOK_FORM_YUP_PAGE_PATH,
    component: lazy(() =>
      import('../components/pages/ReactHookFormValidationYup').then(
        ({ ReactHookFormValidationYupPage }) => ({
          default: ReactHookFormValidationYupPage,
        })
      )
    ),
  },
  {
    path: IMMUTABILITY_HELPER_PAGE_PATH,
    component: lazy(() =>
      import('../components/pages/ImmutabilityHelper').then(({ ImmutabilityHelperPage }) => ({
        default: ImmutabilityHelperPage,
      }))
    ),
  },
  {
    path: REACT_HOOK_FORM_TEST_INPUT_FILE_PAGE_PATH,
    component: lazy(() =>
      import('../components/pages/ReactHookFormTestInputFile').then(
        ({ ReactHookFormTestInputFilePage }) => ({
          default: ReactHookFormTestInputFilePage,
        })
      )
    ),
  },
  {
    path: REACT_ROUTER_PROMPT_CUSTOM_PAGE_PATH,
    component: lazy(() =>
      import('../components/pages/ReactRouterPromptCustom').then(
        ({ ReactRouterPromptCustomPage }) => ({
          default: ReactRouterPromptCustomPage,
        })
      )
    ),
  },
  {
    path: ENZYME_WITH_FILE_INPUT_PAGE_PATH,
    component: lazy(() =>
      import('../components/pages/EnzymeWithFileInput').then(({ EnzymeWithFileInputPage }) => ({
        default: EnzymeWithFileInputPage,
      }))
    ),
  },
  {
    path: REACT_DATE_PICKER_WITH_TESTING_LIBRARY_PAGE_PATH,
    component: lazy(() =>
      import('../components/pages/ReactDatePickerWithTestingLibrary').then(
        ({ ReactDatePickerWithTestingLibraryPage }) => ({
          default: ReactDatePickerWithTestingLibraryPage,
        })
      )
    ),
  },
];
