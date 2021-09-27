import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Group from './entities';
import { UpdateItemActiveQuery, UpdateItemAwardOptionsQuery } from './interfaces';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group) private groupRepository: Repository<Group>,
    ) {
        this.groupRepository = groupRepository;
    }
    createItem({ type, name, managerPermissionActive }) {
        return this.groupRepository.save({ type, name, managerPermissionActive });
    }
    getItem({ id }) {
        return this.groupRepository.findOne({ id });
    }
    getInfo({ id }) {
        return this.groupRepository.findOne({ id });
    }
    updateItem({ id, name, managerPermissionActive }) {
        return this.groupRepository.update({ id }, { name, managerPermissionActive });
    }
    updateItemManagerPermissionActive({ id, managerPermissionActive }) {
        return this.groupRepository.update({ id }, { managerPermissionActive });
    }
    updateItemHouseworkOptions({ id, skipLimit }) {
        return this.groupRepository.update({ id }, { skipLimit });
    }
    updateItemAwardOptions({
        id,
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
    }) {
        const updateQuery: UpdateItemAwardOptionsQuery = {
            alternativePaymentActive,
            paymentActive,
            awardStandard,
            penaltyStandard,
            paymentComboActive,
        };
        if (updateQuery.paymentActive) {
            updateQuery.awardMoney = awardMoney;
            updateQuery.penaltyMoney =penaltyMoney;
        }
        if (updateQuery.paymentComboActive) {
            updateQuery.awardPaymentCombo = awardPaymentCombo;
            updateQuery.penaltyPaymentCombo = penaltyPaymentCombo;
            updateQuery.awardPaymentComboStart = awardPaymentComboStart;
            updateQuery.penaltyPaymentComboStart = penaltyPaymentComboStart;
            updateQuery.awardPaymentComboLimit = awardPaymentComboLimit;
            updateQuery.penaltyPaymentComboLimit = penaltyPaymentComboLimit;
        }

        return this.groupRepository.update(
            { id },
            {
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
            }
        );
    }
    updateItemActive({ id, active, lastInactivateReason }) {
        const updateQuery: UpdateItemActiveQuery = { active };
        if (!active) {
            updateQuery.lastInactivateReason = lastInactivateReason;
            updateQuery.lastInactivateDate = new Date();
        }
        
        return this.groupRepository.update({ id }, updateQuery);
    }
    updateItemLogoImage({ id, logoImageUrl }) {
        return this.groupRepository.update({ id }, { logoImageUrl });
    }
}
