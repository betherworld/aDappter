/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * A transaction to create Emission assets to a specific consumer
 * @param {org.energy.network.CreateEmission} CreateEmission
 * @transaction
 */


async function CreateEmission(tx) {

    const RATIO = 0.265 //CO2/TON;
    const factory = await getFactory();
    const newAsset = await factory.newResource('org.energy.network', 'Emission', Math.floor(Math.random() * 90000) + "");
    const assetRegistry = await getAssetRegistry('org.energy.network.Emission');
    const participantRegistry = await getParticipantRegistry('org.energy.network.Consumer');
    newAsset.litersOil = tx.litersOil;
    newAsset.owner = tx.owner;
    const baseline = ((RATIO/10) / 12); // TonsCO2 / m^2 Month
    //Function to calculate the emission and return the delta
    let delta = await CalculateEmission(tx.litersOil, tx.owner.flatArea,baseline);
    if (delta < 0) {
        const price = -delta * tx.owner.flatArea * 40 // $ convert delta consumption to money
        const numTokens = Math.floor(price);
        newAsset.savedAmount = price;
        //function to generate tokens for consumer
        await GenerateToken(tx, numTokens);
        tx.owner.balance += numTokens;
        await participantRegistry.update(tx.owner);
    }
    newAsset.baseLine = baseline;
    newAsset.delta = delta;
    newAsset.timeStamp = tx.timestamp;
    await assetRegistry.add(newAsset);
}

//calculate the delta
async function CalculateEmission(litersOil, area,baseline) {
    const consumption = (litersOil / area) * (RATIO / 100); //TonsCO2 / m^2 Month
    //delta is the difference from the baseline
    const delta = consumption - baseline;
    return delta;
}

//generate tokens based on the delta
async function GenerateToken(tx, amount) {
    const factory = await getFactory();
    const tokenRegistry = await getAssetRegistry('org.energy.network.Token');
    let tokenArray = [];
    for (let i = 0; i < amount; i++) {
        const newToken = await factory.newResource('org.energy.network', 'Token', tx.owner.consumerID + "-" + Math.floor(Math.random() * 90000));
        newToken.owner = tx.owner;
        tokenArray.push(newToken);
    }
    tokenRegistry.addAll(tokenArray);
}

/**
 * Transaction to assign the tokens to a specific project
 * @param {org.energy.network.assignToken} assignToken
 * @returns {org.energy.network.Msg} Msg concept
 * @transaction
 */
async function assignToken(tx) {
    const factory = await getFactory();
    const projectRegistry = await getAssetRegistry('org.energy.network.Project');
    const tokenRegistry = await getAssetRegistry('org.energy.network.Token');
    const participantRegistry = await getParticipantRegistry('org.energy.network.Consumer');
    const msg = await factory.newConcept('org.energy.network', 'Msg');
    //checking if project is still open for donation
    if (tx.assignedProject.status == "Open") {
        //checking if consumer have balance that covers the amount of donated tokens
        if (tx.owner.balance >= tx.amountTokens) {
            let amountToBeTaken = 0;
            let diff = tx.assignedProject.tokensGoal - tx.assignedProject.projectBalance;
            let donate = true;
            let allTokens = [];
            if (diff == 0) {
                //dont accept donation
                tx.assignedProject.status = "Completed";
                donate = false;

            } else if (diff >= tx.amountTokens) {
                //if the donated amount is less than the diff take all the donation
                amountToBeTaken = tx.amountTokens;
            } else {
                //if the diff is less than the donated amount take the tokens that fulfill the goal of the project
                amountToBeTaken = diff;
            }

            if (donate) {
                //donate tokens to project
                let relation = "resource:org.energy.network.Consumer#" + tx.owner.consumerID;
                allTokens = await query('Q2', { ownerToken: relation, limitParam: amountToBeTaken });
                allTokens.map((tok) => tok.assignedProject = tx.assignedProject);

                tx.owner.balance -= amountToBeTaken;
                tx.owner.assignedTokens += amountToBeTaken;
                tx.assignedProject.projectBalance += amountToBeTaken;
                await tokenRegistry.updateAll(allTokens);
                await participantRegistry.update(tx.owner);
                msg.msg = "Donation was successful donated = " + amountToBeTaken + " Tokens"
            } else {
                //Completed
                msg.msg = "Cannot donate: project status is Completed!";
            }

            if (tx.assignedProject.projectBalance == tx.assignedProject.tokensGoal) {
                tx.assignedProject.status = "Completed";
            }
            await projectRegistry.update(tx.assignedProject);
        } else {
            //NO BALANCE
            msg.msg = "Insufficient token balance \ntokens in balance: " + tx.owner.balance;
        }
    } else {
        //PROJECT IS COMPLETED
        msg.msg = "Cannot donate project already completed";
    }
    return msg;
}


/**
 * transaction that returns all tokens of a specific consumer
 * @param {org.energy.network.getTokens} getTokens
 * @returns {org.energy.network.Token[]} Array of tokens
 * @transaction
 */
async function getTokens(tx) {
    let allTokens = [];
    let relation = "resource:org.energy.network.Consumer#" + tx.owner.consumerID;
    //Q1 is a pre-saved query in the queries.qry file
    allTokens = await query('Q1', { ownerToken: relation });
    return allTokens;
}

