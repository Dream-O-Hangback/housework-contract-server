import {
    Controller,
    Get,
    Post,
    HttpException,
    HttpStatus,
    HttpCode,
    Request,
    UseGuards,
    Body,
    Query,
} from '@nestjs/common';
import { JwtStrategyGuard } from '@auth/guards/jwt.guard';
import { successMessageGenerator } from '@common/lib';
import { failMessage } from '@common/constants';
import { GroupService } from './group.service';
import { GroupMemberService } from '../groupMember/groupMember.service';
import GroupDto from './dto/group.dto';
import ListQuery from './dto/list.query';

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
                groupMemberCreatePromises.push(this.groupMemberService.createItem({ accountId: groupMembers[i], groupId: group.id, nickname: `member${i + 1}` }));
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
            let groupMember = undefined;
            list = list.map((elem: any) => {
                const { groupId, ...groupMemberParams } = elem;
                if (!groupMember) groupMember = { ...groupMemberParams };
                return groupId;
            })

            return successMessageGenerator({ groupMember, groupList: list, groupCount: count });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
