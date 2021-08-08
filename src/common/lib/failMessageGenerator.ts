import FailMessageType from "../interfaces/failMessageType";

export const failMessageTypeGenerator = ({ errorCode, description }: FailMessageType) => {
    return { message: 'fail', errorCode, description };
}
