export default interface JoinedGroupMember {
    id: string;
    nickname: string;
    isManager: boolean;
    accountId: {
        id: string;
        profileImageUrl: string;
    }
}
