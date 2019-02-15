import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
//export namespace org.energy.network{
   export class Msg {
      msg: string;
   }
   export class Consumer extends Participant {
      consumerID: string;
      zipCode: string;
      flatArea: number;
      balance: number;
      assignedTokens: number;
   }
   export class ProjectOwner extends Participant {
      ownerID: string;
      Name: string;
   }
   export class Emission extends Asset {
      emissionID: string;
      litersOil: number;
      delta: number;
      savedAmount: number;
      timeStamp: Date;
      baseLine: number;
      owner: Consumer;
   }
   export class Project extends Asset {
      projectID: string;
      projectTitle: string;
      projectDescription: string;
      projectBalance: number;
      tokensGoal: number;
      status: string;
      owner: ProjectOwner;
   }
   export class Token extends Asset {
      tokenID: string;
      owner: Consumer;
      assignedProject: Project;
   }
   export class assignToken extends Transaction {
      amountTokens: number;
      owner: Consumer;
      assignedProject: Project;
   }
   export class CreateEmission extends Transaction {
      litersOil: number;
      owner: Consumer;
   }
   export class getTokens extends Transaction {
      owner: Consumer;
   }
   export class getAreaEmissions extends Transaction {
      zipCode: string;
   }
   export class EmissionCreated extends Event {
      asset: Emission;
      transactionID: string;
   }
//}
