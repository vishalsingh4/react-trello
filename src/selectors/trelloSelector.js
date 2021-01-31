import { createSelector } from "reselect";

const selectTrelloModel = (state) => state.trello;

const selectAppData = createSelector(selectTrelloModel, (item) => item.appData);

const selectLoginAuthToken = createSelector(
  selectTrelloModel,
  (item) => item.authTokenLogin
);

export { selectAppData, selectLoginAuthToken };
