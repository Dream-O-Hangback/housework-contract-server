import FailMessageType from "../interfaces/failMessageType";

export default ({ errorCode, description }: FailMessageType) => {
    return { message: 'fail', errorCode, description };
}
