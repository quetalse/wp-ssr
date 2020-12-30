import {bathroomsSaga, clientBathroomsSaga} from './bathrooms';
import {bathroomSaga, clientBathroomSaga} from './bathroom';
import {rootSaga, clientRootSaga} from './root';

export const allSagas = {
    bathroomsSaga,
    clientBathroomsSaga,
    bathroomSaga,
    clientBathroomSaga,
    rootSaga,
    clientRootSaga
}