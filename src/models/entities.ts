import Account from './account/entities';
import AlternativePayment from './alternativePayment/entities';
import AlternativePaymentLog from './alternativePaymentLog/entities';
import Award from './award/entities';
import AwardLog from './awardLog/entities';
import CertificationCode from './certificationCode/entities';
import CoinBankLog from './coinBanklog/entities';
import Confirmation from './confirmation/entities';
import ConfirmationShareId from './confirmationShareId/entities';
import { DefaultAward, DefaultHousework, DefaultGroupType } from './default/entities';
import Group from './group/entities';
import GroupMember from './groupMember/entities';
import Housework from './housework/entities';
import HouseworkDumpLog from './houseworkDumpLog/entities';
import HouseworkLog from './houseworkLog/entities';
import { Routine, RoutineFullCharge, RoutineRotation } from './routine/entities';
import Rule from './rule/entities';
import RuleLog from './ruleLog/entities';
import Withdraw from './withdraw/entities';

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