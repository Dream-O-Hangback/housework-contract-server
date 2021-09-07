import { failMessageTypeGenerator } from '@common/lib';
import * as failMessageType from './failMessageType';

export const ERR_INVALID_PARAM = failMessageTypeGenerator(failMessageType.ERR_INVALID_PARAM);
export const ERR_NOT_VERIFIED = failMessageTypeGenerator(failMessageType.ERR_NOT_VERIFIED);
export const ERR_NOT_UPLOADED = failMessageTypeGenerator(failMessageType.ERR_NOT_UPLOADED);
export const ERR_ALREADY_EXISTS = failMessageTypeGenerator(failMessageType.ERR_ALREADY_EXISTS);
export const ERR_ALREADY_EXISTS_GROUP_MEMBER = failMessageTypeGenerator(failMessageType.ERR_ALREADY_EXISTS_GROUP_MEMBER);
export const ERR_ALREADY_CREATED = failMessageTypeGenerator(failMessageType.ERR_ALREADY_CREATED);
export const ERR_MANAGER_CANNOT_WITHDRAW = failMessageTypeGenerator(failMessageType.ERR_MANAGER_CANNOT_WITHDRAW);
export const ERR_NOT_FOUND = failMessageTypeGenerator(failMessageType.ERR_NOT_FOUND);
export const ERR_AWARD_NOT_FOUND = failMessageTypeGenerator(failMessageType.ERR_AWARD_NOT_FOUND);
export const ERR_HOUSEWORK_NOT_FOUND = failMessageTypeGenerator(failMessageType.ERR_HOUSEWORK_NOT_FOUND);
export const ERR_GROUP_NOT_FOUND = failMessageTypeGenerator(failMessageType.ERR_GROUP_NOT_FOUND);
export const ERR_GROUP_MEMBER_NOT_FOUND = failMessageTypeGenerator(failMessageType.ERR_GROUP_MEMBER_NOT_FOUND);
export const ERR_ROUTINE_NOT_FOUND = failMessageTypeGenerator(failMessageType.ERR_ROUTINE_NOT_FOUND);
export const ERR_INTERVER_SERVER = failMessageTypeGenerator(failMessageType.ERR_INTERVER_SERVER);
