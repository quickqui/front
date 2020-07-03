import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import {
  adminReducer,
  adminSaga,
  createAppReducer,
  defaultI18nProvider,
  i18nReducer,
  formMiddleware,
  USER_LOGOUT,
} from "react-admin";





export default ({
    dataProvider,
    history,
    customReducers = {},
    authProvider = null,
    customSagas = [],
    i18nProvider = defaultI18nProvider,
    initialState,
    locale = 'en',
}) => {
    const messages = i18nProvider(locale);
    const appReducer = createAppReducer(customReducers, locale, messages);

    const resettableAppReducer = (state, action) =>
        appReducer(action.type !== USER_LOGOUT ? state : undefined, action);
    const saga = function* rootSaga() {
        yield all(
            [
                adminSaga(dataProvider, authProvider, i18nProvider),
                autoSavingSaga,
            ]//.map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();
    const typedWindow = window ;

    const store = createStore(
        resettableAppReducer,
        initialState,
        compose(
            applyMiddleware(
                sagaMiddleware,
                formMiddleware,
                routerMiddleware(history)
            ),
            typeof typedWindow !== 'undefined' &&
                typedWindow.__REDUX_DEVTOOLS_EXTENSION__
                ? typedWindow.__REDUX_DEVTOOLS_EXTENSION__()
                : f => f
        )
    );
    sagaMiddleware.run(saga);
    return store;
};
