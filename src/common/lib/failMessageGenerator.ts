import { FailMessageType } from "../interfaces";

export const failMessageTypeGenerator = ({ errorCode, description }: FailMessageType) => {
    return { message: 'fail', errorCode, description };
}
