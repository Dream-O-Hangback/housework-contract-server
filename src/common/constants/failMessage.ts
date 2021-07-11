import failMessageGenerator from '../lib/failMessageGenerator';
import * as failMessageType from './failMessageType';

export default {
    ERR_INVALID_PARAM: failMessageGenerator(failMessageType.ERR_INVALID_PARAM),
    ERR_ALREADY_EXISTS: failMessageGenerator(failMessageType.ERR_ALREADY_EXISTS),
    ERR_ALREADY_STARTED: failMessageGenerator(failMessageType.ERR_ALREADY_STARTED),
    ERR_NOT_FOUND: failMessageGenerator(failMessageType.ERR_NOT_FOUND),
    ERR_INTERVER_SERVER: failMessageGenerator(failMessageType.ERR_INTERVER_SERVER),
}
