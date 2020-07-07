import { takeLatest, put, takeEvery, take, throttle } from "redux-saga/effects";
import {delay} from 'redux-saga'

export default function* () {
    yield takeLatest( "AUTO_SAVING_ON_CHANGE", saveIt);
}
// function* saveIt2{l
//     console.log('what?')
// }

export function saveItAction(autoSavingAction) {
  const { record, source, value, resource } = autoSavingAction.payload;
  return {
    type: "RA/CRUD_UPDATE",
    payload: {
      id: record.id,
      data: { ...record, [source]: value },
      previousData: record,
    },
    meta: {
      resource,
      fetch: "UPDATE",
      onSuccess: {
        notification: {
          body: "ra.notification.updated",
          level: "info",
          messageArgs: {
            smart_count: 1,
          },
        },
      },
      onFailure: {
        notification: {
          body: "ra.notification.http_error",
          level: "warning",
        },
      },
    },
  };
}
export function* saveIt(autoSavingAction) {
  try {
    yield delay(1000)
    yield put(saveItAction(autoSavingAction));
  } catch (e) {
    console.error("request error: ", e);
  }
}
