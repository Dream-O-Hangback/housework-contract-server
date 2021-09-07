import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    HttpException,
    HttpStatus,
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
import { failMessage, ShareMethodType } from '@common/constants';
import GroupMember from '@models/groupMember/entities';
import { GroupService } from './group.service';
import { GroupMemberService } from '../groupMember/groupMember.service';
import { AlternativePaymentService } from '../alternativePayment/alternativePayment.service';
import { AwardService } from '../award/award.service';
import { HouseworkService } from '../housework/housework.service';
import { RuleService } from '../rule/rule.service';
import { RoutineService } from '../routine/routine.service';
import {
    GroupDto,
    GroupUpdateDto,
    GroupActiveUpdateDto,
    GroupMemberUpdateDto,
    AlternativePaymentDto,
    AlternativePaymentIdParams,
    AlternativePaymentUpdateDto,
    AwardDto,
    AwardIdParams,
    AwardOptionUpdateDto,
    AwardUpdateDto,
    ListQuery,
    IdParams,
    BooleanUpdateDto,
    NicknameDto,
    HouseworkDto,
    HouseworkIdParams,
    HouseworkOptionUpdateDto,
    HouseworkUpdateDto,
    RoutineFullChargeDto,
    RuleDto,
    RuleIdParams,
    RuleUpdateDto,
} from './dto';
import { RedefinedGroupMemberInfo } from './interfaces';

@Controller('groups')
@UseGuards(JwtStrategyGuard)
export class GroupController {
    constructor(
        private groupService: GroupService,
        private groupMemberService: GroupMemberService,
        private alternativePaymentService: AlternativePaymentService,
        private awardService: AwardService,
        private houseworkService: HouseworkService,
        private routineService: RoutineService,
        private ruleService: RuleService,
    ) {
        this.groupService = groupService;
        this.groupMemberService = groupMemberService;
        this.alternativePaymentService = alternativePaymentService;
        this.awardService = awardService;
        this.houseworkService = houseworkService;
        this.routineService = routineService;
        this.ruleService = ruleService
    }

    @Post('/')
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

    @Get('/me')
    async GetMyGroupList(@Request() req, @Query() listData: ListQuery) {
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

    @Get('/:id')
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

    @Patch('/:id')
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

    @Patch('/:id/active')
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

    @Patch('/:id/manager-permission')
    async UpdateGroupManagerPermissionActive(@Param() params: IdParams, @Body() groupManagerPermisssionUpdateData: BooleanUpdateDto, @Request() req) {
        try {
            // TODO: permission 처리
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const { value } = groupManagerPermisssionUpdateData;

            const groupMember = await this.groupMemberService.getInfoByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.groupService.updateItemManagerPermissionActive({ id: groupId, managerPermissionActive: value });
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

    @Patch('/:id/options/housework')
    async UpdateGroupHouseworkOptions(@Param() params: IdParams, @Body() houseworkOptionUpdateData: HouseworkOptionUpdateDto, @Request() req) {
        try {
            // TODO: permission 처리
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const { startDay, shareMethod } = houseworkOptionUpdateData;
            let { skipLimit } = houseworkOptionUpdateData;

            const houseworkCount = await this.houseworkService.getCount({ groupId });
            skipLimit = Math.min(skipLimit, houseworkCount);

            const groupMember = await this.groupMemberService.getInfoByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupUpdateResult = await this.groupService.updateItemHouseworkOptions({ id: groupId, skipLimit });
            if (groupUpdateResult.affected === 0) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const routine = await this.routineService.getItem({ groupId });
            if (routine) {
                // TODO add lastValue update condition
                const routineUpdateResult = await this.routineService.updateItem({ groupId, startDay, shareMethod, startDayLastValue: routine.startDay, shareMethodLastValue: routine.shareMethod });
                if (routineUpdateResult.affected === 0) {
                    throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
                }
            } else {
                await this.routineService.createItem({ groupId, startDay, shareMethod });
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

    @Patch('/:id/options/award')
    async UpdateGroupAwardOptions(@Param() params: IdParams, @Body() awardOptionUpdateData: AwardOptionUpdateDto, @Request() req) {
        try {
            // TODO: permission 처리
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const {
                alternativePaymentActive,
                paymentActive,
                awardStandard,
                penaltyStandard,
                awardMoney,
                penaltyMoney,
                paymentComboActive,
                awardPaymentCombo,
                penaltyPaymentCombo,
                awardPaymentComboStart,
                penaltyPaymentComboStart,
                awardPaymentComboLimit,
                penaltyPaymentComboLimit,
            } = awardOptionUpdateData;

            const groupMember = await this.groupMemberService.getInfoByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupUpdateResult = await this.groupService.updateItemAwardOptions({
                id: groupId,
                alternativePaymentActive,
                paymentActive,
                awardStandard,
                penaltyStandard,
                awardMoney,
                penaltyMoney,
                paymentComboActive,
                awardPaymentCombo,
                penaltyPaymentCombo,
                awardPaymentComboStart,
                penaltyPaymentComboStart,
                awardPaymentComboLimit,
                penaltyPaymentComboLimit,
            });
            if (groupUpdateResult.affected === 0) {
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

    @UseInterceptors(FileInterceptor('files'))
    @Post('/:id/logo/upload')
    async UpdateGroupLogoImage(@Param() params: IdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;

            const logoImageUrl = req.file.location;
            if (!logoImageUrl) {
                throw new HttpException(failMessage.ERR_NOT_UPLOADED, HttpStatus.BAD_REQUEST);
            }

            const groupMember = await this.groupMemberService.getInfoByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.groupService.updateItemLogoImage({ id: groupId, logoImageUrl });
            if (result.affected === 0) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            return successMessageGenerator({ logoImageUrl });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:id/logo/reset')
    async ResetGroupLogoImage(@Param() params: IdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;

            const groupMember = await this.groupMemberService.getInfoByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.groupService.updateItemLogoImage({ id: groupId, logoImageUrl: undefined });
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

    @Get('/:id/me')
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

    @Patch('/:id/me')
    async UpdateMyGroupMemberInfo(@Param() params: IdParams, @Body() groupMemberUpdatedata: GroupMemberUpdateDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const { selectAwardId } = groupMemberUpdatedata;

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

    @Delete('/:id/me')
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

    @Patch('/:id/me/active')
    async UpdateMyGroupMemberActive(@Param() params: IdParams, @Body() booleanUpdatedata: BooleanUpdateDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const { value } = booleanUpdatedata;

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

    @Patch('/:id/me/nickname')
    async UpdateMyGroupMemberNickname(@Param() params: IdParams, @Body() nicknameData: NicknameDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
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

    @Post('/:id/nickname/exists')
    async CheckNicknameDuplication(@Param() params: IdParams, @Body() nicknameData: NicknameDto) {
        try {
            const { id: groupId } = params;
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

    @Post('/:id/alternative-payments')
    async CreateGroupAlternativePayment(@Param() params: IdParams, @Body() alternativePaymentData: AlternativePaymentDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const { type, name, reason } = alternativePaymentData;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            await this.alternativePaymentService.createItem({ groupId, type, name, reason });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id/alternative-payments')
    async GetGroupAlternativePaymentList(@Param() params: IdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.alternativePaymentService.getList({ groupId });

            return successMessageGenerator(result);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/:groupid/alternative-payments/:id')
    async UpdateGroupAlternativePayment(@Param() params: AlternativePaymentIdParams, @Body() alternativePaymentUpdateData: AlternativePaymentUpdateDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { groupid: groupId, id } = params;
            const { type, name, reason } = alternativePaymentUpdateData;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.alternativePaymentService.updateItem({ groupId, id, type, name, reason });
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

    @Delete('/:groupid/alternative-payments/:id')
    async DeleteGroupAlternativePayment(@Param() params: AlternativePaymentIdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { groupid: groupId, id } = params;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            await this.alternativePaymentService.deleteItem({ groupId, id });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/:id/awards')
    async CreateGroupAward(@Param() params: IdParams, @Body() awardData: AwardDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const { type, title, description, defaultAwardId, includeContent } = awardData;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            await this.awardService.createItem({ groupId, type, title, description, defaultAwardId, includeContent });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id/awards')
    async GetGroupAwardList(@Param() params: IdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.awardService.getList({ groupId });

            return successMessageGenerator(result);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/:groupid/awards/:id')
    async UpdateGroupAward(@Param() params: AwardIdParams, @Body() awardUpdateData: AwardUpdateDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { groupid: groupId, id } = params;
            const { type, title, description, defaultAwardId, includeContent } = awardUpdateData;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            await this.awardService.updateItem({ groupId, id, type, title, description, defaultAwardId, includeContent });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:groupid/awards/:id')
    async DeleteGroupAward(@Param() params: AwardIdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { groupid: groupId, id } = params;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            await this.awardService.deleteItem({ groupId, id });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/:id/routines/full-charge')
    async CreateGroupRoutineFullCharge(@Param() params: IdParams, @Body() routineFullChargeData: RoutineFullChargeDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const { groupMemberId, houseworkId } = routineFullChargeData;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const doesExistGroupMember = await this.groupMemberService.getItem({ groupId, id: groupMemberId });
            if (!doesExistGroupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const doesExistHousework = await this.houseworkService.getItem({ groupId, id: houseworkId });
            if (!doesExistHousework) {
                throw new HttpException(failMessage.ERR_HOUSEWORK_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const doesExistRoutineFullCharge = await this.routineService.getFullChargeItem({ groupId, groupMemberId, houseworkId });
            if (doesExistRoutineFullCharge) {
                throw new HttpException(failMessage.ERR_ALREADY_CREATED, HttpStatus.CONFLICT);
            }

            const routine = await this.routineService.getItem({ groupId });

            const startDate = new Date();
            const diff = routine.startDay - startDate.getDay();
            startDate.setDate(startDate.getDate() + (7 - Math.abs(diff)));
            startDate.setHours(0);
            startDate.setMinutes(0);
            startDate.setSeconds(0);

            await this.routineService.createFullChargeItem({ groupId, groupMemberId, houseworkId, startDate });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id/routines/full-charge')
    async GetGroupRoutineFullChargeList(@Param() params: IdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.routineService.getFullChargeList({ groupId });

            return successMessageGenerator(result);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/:id/rules')
    async CreateGroupRule(@Param() params: IdParams, @Body() ruleData: RuleDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const { rules } = ruleData;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const promises = [];
            for (let i = 0; i < rules.length; i++) {
                promises.push(this.ruleService.createItem({ groupId, content: rules[i], createDate: new Date() }))
            }
            await Promise.all(promises);

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id/rules')
    async GetGroupRuleList(@Param() params: IdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.ruleService.getList({ groupId });

            return successMessageGenerator(result);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/:groupid/rules/:id')
    async UpdateGroupRule(@Param() params: RuleIdParams, @Body() ruleUpdateData: RuleUpdateDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { groupid: groupId, id } = params;
            const { content } = ruleUpdateData;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.ruleService.updateItem({ groupId, id, content });
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

    @Delete('/:groupid/rules/:id')
    async DeleteGroupRule(@Param() params: RuleIdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { groupid: groupId, id } = params;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.ruleService.deleteItem({ groupId, id });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/:id/housework')
    async CreateGroupHousework(@Param() params: IdParams, @Body() houseworkData: HouseworkDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;
            const { type, title, description, deployCount, frequency } = houseworkData;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            await this.houseworkService.createItem({ groupId, type, title, description, deployCount, frequency });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id/housework')
    async GetGroupHouseworkList(@Param() params: IdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { id: groupId } = params;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const result = await this.houseworkService.getList({ groupId });

            return successMessageGenerator(result);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/:groupid/housework/:id')
    async UpdateGroupHousework(@Param() params: HouseworkIdParams, @Body() houseworkUpdateData: HouseworkUpdateDto, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { groupid: groupId, id } = params;
            const { type, title, description, deployCount, frequency } = houseworkUpdateData;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            await this.houseworkService.updateItem({ groupId, id, type, title, description, deployCount, frequency });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/:groupid/housework/:id')
    async DeleteGroupHouseworkList(@Param() params: HouseworkIdParams, @Request() req) {
        try {
            const { id: userId } = req.user;
            const { groupid: groupId, id } = params;

            const group = await this.groupService.getItem({ id: groupId });
            if (!group) {
                throw new HttpException(failMessage.ERR_GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const groupMember = await this.groupMemberService.getItemByAccountId({ groupId, accountId: userId });
            if (!groupMember) {
                throw new HttpException(failMessage.ERR_GROUP_MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            await this.houseworkService.deleteItem({ groupId, id });

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
