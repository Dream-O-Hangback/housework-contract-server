import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    HttpException,
    HttpStatus,
    HttpCode,
    Request,
    UseGuards,
    Body,
    Query,
    Param,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtStrategyGuard } from '@auth/guards/jwt.guard';
import { successMessageGenerator } from '@common/lib';
import { failMessage } from '@common/constants';
import GroupMember from '@models/groupMember/entities';
import { GroupService } from './group.service';
import { GroupMemberService } from '../groupMember/groupMember.service';
import {
    GroupDto,
    GroupUpdateDto,
    GroupActiveUpdateDto,
    GroupMemberUpdateDto,
    ListQuery,
    IdParams,
    BooleanUpdateDto,
    NicknameDto
} from './dto';
import { RedefinedGroupMemberInfo } from './interfaces';

@Controller()
@UseGuards(JwtStrategyGuard)
export class GroupController {
    constructor(
        private groupService: GroupService,
        private groupMemberService: GroupMemberService,
    ) {
        this.groupService = groupService;
        this.groupMemberService = groupMemberService;
    }

    @UseGuards(JwtStrategyGuard)
    @Post('/group')
    @HttpCode(200)
    async CreateGroup(@Request() req, @Body() groupData: GroupDto) {
        try {
            const { id } = req.user;
            const { groupMembers, ...groupCreateData } = groupData;
            
            const group = await this.groupService.createItem(groupCreateData);

            groupMembers.push(id);

            const groupMemberCreatePromises = [];
            for (let i = 0; i < groupMembers.length; i++) {
                groupMemberCreatePromises.push(this.groupMemberService.createItem({
                    accountId: groupMembers[i],
                    groupId: group.id,
                    nickname: `member${i + 1}`,
                    isManager: groupMembers[i] === id,
                }));
            }
            await Promise.all(groupMemberCreatePromises);

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Get('/groups/me')
    @HttpCode(200)
    async GetMyGroups(@Request() req, @Query() listData: ListQuery) {
        try {
            const { id } = req.user;
            let { offset, limit } = listData;

            offset = isNaN(offset) ? 0 : offset;
            limit = isNaN(limit) ? 5 : limit;

            let { list, count } = await this.groupMemberService.getMyGroups({ accountId: id, skip: offset * limit, take: limit });

            return successMessageGenerator({ list, count });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Get('/groups/:id')
    @HttpCode(200)
    async GetGroupInfo(@Param() params: IdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
            
            const group = await this.groupService.getInfo({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            let groupMembers = await this.groupMemberService.getGroupMemberListAndGroupInfo({ groupId });

            const redefinedGroupMembers: RedefinedGroupMemberInfo[] = groupMembers.map((item: any) => {
                const { account, ...groupMemberParams } = item;
                const { id, profileImageUrl } = account;
                return { accountId: id, profileImageUrl, ...groupMemberParams };
            });

            if (!redefinedGroupMembers.filter((item) => item.accountId === userId).length) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            return successMessageGenerator({ group, groupMembers: redefinedGroupMembers });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/groups/:id')
    @HttpCode(200)
    async UpdateGroupInfo(@Param() params: IdParams, @Body() groupUpdateData: GroupUpdateDto) {
        try {
            // TODO: permission 처리
            // TODO: 추가된, 삭제된 멤버의 housework log 처리
            const { id: groupId } = params;
            const { groupMembers, ...groupUpdateDataParams } = groupUpdateData;
            
            const result = await this.groupService.updateItem({ id: groupId, ...groupUpdateDataParams });
            if (result.affected === 0) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const originalGroupMembers = await this.groupMemberService.getListByGroupId({ groupId });
            const originalGroupMemberIds = originalGroupMembers.map((item: GroupMember) => item.accountId);

            const groupMemberCreatePromises = [];
            for (let i = 0; i < groupMembers.length; i++) {
                if (originalGroupMemberIds.includes(groupMembers[i])) {
                    throw new HttpException(failMessage.ERR_ALREADY_EXISTS_GROUP_MEMBER, HttpStatus.CONFLICT);
                }

                groupMemberCreatePromises.push(this.groupMemberService.createItem({
                    accountId: groupMembers[i],
                    groupId,
                    nickname: `member${originalGroupMemberIds.length + i + 1}`,
                    isManager: false,
                }));
            }
            await Promise.all(groupMemberCreatePromises);

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/groups/:id/active')
    @HttpCode(200)
    async UpdateGroupLogo(@Param() params: IdParams, @Body() groupActiveUpdateData: GroupActiveUpdateDto) {
        try {
            // TODO: permission 처리
            // TODO: housework log 처리
            const { id: groupId } = params;
            const { value, reason } = groupActiveUpdateData;
            
            const result = await this.groupService.updateItemActive({ id: groupId, active: value, lastInactivateReason: reason });
            if (result.affected === 0) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @UseInterceptors(FileInterceptor('files'))
    @Post('/groups/:id/logo/upload')
    @HttpCode(200)
    async UpdateGroupLogoImage(@Param() params: IdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;

            const logoImageUrl = req.file.location;
            if (!logoImageUrl) {
                throw new HttpException(failMessage.ERR_NOT_UPLOADED, HttpStatus.BAD_REQUEST);
            }

            const group = await this.groupService.getInfo({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getInfoByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            await this.groupService.updateItemLogoImage({ id: groupId, logoImageUrl });

            return successMessageGenerator({ logoImageUrl });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Delete('/groups/:id/logo/reset')
    @HttpCode(200)
    async ResetGroupLogoImage(@Param() params: IdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;

            const group = await this.groupService.getInfo({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getInfoByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            await this.groupService.updateItemLogoImage({ id: groupId, logoImageUrl: undefined });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Get('/groups/:id/me')
    @HttpCode(200)
    async GetMyGroupMemberInfo(@Param() params: IdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
            
            const group = await this.groupService.getInfo({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getInfoByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const {
                selectAward,
                nickname,
                isManager,
                active,
                updateDate,
                createDate,
            } = groupMember;

            return successMessageGenerator({
                selectAward,
                nickname,
                isManager,
                active,
                updateDate,
                createDate,
            });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/groups/:id/me')
    @HttpCode(200)
    async UpdateMyGroupMemberInfo(@Param() params: IdParams, @Body() groupMemberUpdatedate: GroupMemberUpdateDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const { selectAwardId } = groupMemberUpdatedate;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            
            // TODO: 404 AWARD_NOT_FOUND 오류 처리
            // const award = await this.awardService.getItem({ id: selectedAwardId });
            // if (!award) {
            //     throw new HttpException(failMessage.ERR_AWARD_NOT_FOUND, HttpStatus.NOT_FOUND);
            // }

            const result = await this.groupMemberService.updateItem({ accountId: userId, groupId, selectAwardId });
            if (!result.affected) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Delete('/groups/:id/me')
    @HttpCode(200)
    async DeleteMyGroupMember(@Param() params: IdParams, @Request() req) {
        try {
            // TODO: housework log 처리
            const { id: userId } = req.user;
            const { id: groupId } = params;
            
            const group = await this.groupService.getInfo({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            
            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            if (groupMember.isManager === true) {
                throw new HttpException(failMessage.ERR_MANAGER_CANNOT_WITHDRAW, HttpStatus.BAD_REQUEST);
            }

            await this.groupMemberService.deleteItemByAccountId({ groupId, accountId: userId })

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/groups/:id/me/active')
    @HttpCode(200)
    async UpdateMyGroupMemberActive(@Param() params: IdParams, @Body() booleanUpdatedate: BooleanUpdateDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const { value } = booleanUpdatedate;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.groupMemberService.updateItemActive({ accountId: userId, groupId, value });
            if (!result.affected) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/groups/:id/me/nickname')
    @HttpCode(200)
    async UpdateMyGroupMemberNickname(@Param() params: IdParams, @Body() nicknameData: NicknameDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params
            const { nickname } = nicknameData;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.groupMemberService.updateItemNickname({ accountId: userId, groupId, nickname });
            if (!result.affected) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Post('/groups/:id/nickname/exists')
    @HttpCode(200)
    async CheckNicknameDuplication(@Param() params: IdParams, @Body() nicknameData: NicknameDto) {
        try {
            const { id: groupId } = params
            const { nickname } = nicknameData;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const isDuplicated = !!(await this.groupMemberService.getItemByNickname({ groupId, nickname }));
            if (isDuplicated) {
                throw new HttpException(failMessage.ERR_ALREADY_EXISTS, HttpStatus.CONFLICT);
            }

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
