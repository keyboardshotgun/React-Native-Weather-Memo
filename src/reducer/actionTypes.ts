// weatherReducer
export const RESET_ALL_DATA      = 'all/RESET'      as const;

export const REQ_WEATHER_DATA          = 'weather/REQ_LOAD' as const;
export const REQ_ERROR_WEATHER_DATA    = 'weather/REQ_ERROR' as const;
export const REQ_COMPLETE_WEATHER_DATA = 'weather/REQ_COMPLETE' as const;

export const GET_WEATHER_DATA      = 'weather/GET'     as const;
export const SET_WEATHER_PAGE_INFO = 'weather/SUB_SET' as const;
export const SET_WEATHER_DATA      = 'weather/SET'    as const;
export const DELETE_WEATHER_DATA   = 'weather/DELETE' as const;

export const SET_MY_LOCATION_DATA   = 'myLocation/SET' as const;
export const RESET_MY_LOCATION_DATA = 'myLocation/RESET' as const;
export const SET_TODAY_WEATHER      = 'weather/TODAY' as const;
export const SET_MEMOBOARD_SHOW_HIDE = 'modal/MEMOBOARD_SHOW_HIDE' as const;
export const SET_MEMOBOARD_DATA     = 'modal/SET_MEMOBOARD_DATA' as const;

export const START_UPDATE_MONTH = 'memo/START_UPDATE_MONTH' as const;
