import { actionTypes } from './actions';
import {
  DEVICE_TYPE,
  FILE_EXPLORER_VIEW_TYPE,
  APP_THEME_MODE_TYPE,
} from '../../enums';

export const initialState = {
  freshInstall: 0,
  onboarding: {
    lastFiredVersion: null,
  },
  toggleSettings: false,
  enableAutoUpdateCheck: true,
  enableBackgroundAutoUpdate: true,
  enablePrereleaseUpdates: false,
  enableAnalytics: true,
  enableStatusBar: true,
  hideHiddenFiles: {
    [DEVICE_TYPE.local]: true,
    [DEVICE_TYPE.mtp]: true,
  },

  fileExplorerListingType: {
    [DEVICE_TYPE.local]: FILE_EXPLORER_VIEW_TYPE.grid,
    [DEVICE_TYPE.mtp]: FILE_EXPLORER_VIEW_TYPE.grid,
  },
  appThemeMode: APP_THEME_MODE_TYPE.auto,
  showLocalPane: true,
  showLocalPaneOnLeftSide: true,
  showDirectoriesFirst: true,
};

export default function Settings(state = initialState, action) {
  const { type, payload, deviceType = null } = action;

  switch (type) {
    case actionTypes.FRESH_INSTALL:
      return { ...state, freshInstall: payload };

    case actionTypes.SET_ONBOARDING:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          ...payload,
        },
      };

    case actionTypes.TOGGLE_SETTINGS:
      return { ...state, toggleSettings: payload };

    case actionTypes.HIDE_HIDDEN_FILES:
      return {
        ...state,
        hideHiddenFiles: {
          ...state.hideHiddenFiles,
          [deviceType]: payload,
        },
      };

    case actionTypes.FILE_EXPLORER_LISTING_TYPE:
      return {
        ...state,
        fileExplorerListingType: {
          ...state.fileExplorerListingType,
          [deviceType]: payload,
        },
      };

    case actionTypes.COMMON_SETTINGS:
      return {
        ...state,
        [payload.key]: payload.value,
      };

    case actionTypes.COPY_JSON_FILE_TO_SETTINGS:
      return { ...state, ...payload };

    default:
      return state;
  }
}
