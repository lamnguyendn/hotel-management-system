import { lazy } from 'react';
import {
  FILE_PAGE_PATH,
  FORM_PAGE_PATH,
  LIST_PAGE_PATH,
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
      import('../components/pages/List').then(({ ListPage }) => ({
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
];
