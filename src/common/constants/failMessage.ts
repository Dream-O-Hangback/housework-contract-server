import { failMessageTypeGenerator } from '@common/lib';
import * as failMessageType from './failMessageType';

export default {
    ERR_INVALID_PARAM: failMessageTypeGenerator(failMessageType.ERR_INVALID_PARAM),
    ERR_NOT_VERIFIED: failMessageTypeGenerator(failMessageType.ERR_NOT_VERIFIED),
    ERR_NOT_UPLOADED: failMessageTypeGenerator(failMessageType.ERR_NOT_UPLOADED),
    ERR_ALREADY_EXISTS: failMessageTypeGenerator(failMessageType.ERR_ALREADY_EXISTS),
    ERR_ALREADY_CREATED: failMessageTypeGenerator(failMessageType.ERR_ALREADY_CREATED),
    ERR_NOT_FOUND: failMessageTypeGenerator(failMessageType.ERR_NOT_FOUND),
    ERR_GROUP_NOT_FOUND: failMessageTypeGenerator(failMessageType.ERR_GROUP_NOT_FOUND),
    ERR_GROUP_MEMBER_NOT_FOUND: failMessageTypeGenerator(failMessageType.ERR_GROUP_MEMBER_NOT_FOUND),
    ERR_INTERVER_SERVER: failMessageTypeGenerator(failMessageType.ERR_INTERVER_SERVER),
}
