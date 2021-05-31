import Account from './account/account.entity';
import AlternativePayment from './alternativePayment/alternativePayment.entity';
import AlternativePaymentLog from './alternativePaymentLog/alternativePaymentLog.entity';
import Award from './award/award.entity';
import AwardLog from './awardLog/awardLog.entity';
import CertificationCode from './certificationCode/certificationCode.entity';
import CoinBankLog from './coinBanklog/coinBankLog.entity';
import Confirmation from './confirmation/confirmation.entity';
import ConfirmationShareId from './confirmationShareId/confirmationShareId.entity';
import { DefaultAward, DefaultHousework, DefaultPenalty } from './default/default.entity';
import DefaultGroupType from './default/defaultGroupType.entity';
import Group from './group/group.entity';
import GroupMember from './groupMember/groupMember.entity';
import Housework from './housework/housework.entity';
import HouseworkDumpLog from './houseworkDumpLog/houseworkDumpLog.entity';
import HouseworkLog from './houseworkLog/houseworkLog.entity';
import Penalty from './penalty/penalty.entity';
import PenaltyLog from './penaltyLog/penaltyLog.entity';
import Routine from './routine/routine.entity';
import RoutineFullCharge from './routine/routineFullCharge.entity';
import RoutineRotation from './routine/routineRotation.entity';
import Rule from './rule/rule.entity';
import RuleLog from './ruleLog/ruleLog.entity';
import Withdraw from './withdraw/withdraw.entity';

export default [
    Account,
    AlternativePayment,
    AlternativePaymentLog,
    Award,
    AwardLog,
    CertificationCode,
    CoinBankLog,
    Confirmation,
    ConfirmationShareId,
    DefaultAward,
    DefaultHousework,
    DefaultPenalty,
    DefaultGroupType,
    Group,
    GroupMember,
    Housework,
    HouseworkDumpLog,
    HouseworkLog,
    Penalty,
    PenaltyLog,
    Routine,
    RoutineFullCharge,
    RoutineRotation,
    Rule,
    RuleLog,
    Withdraw
]