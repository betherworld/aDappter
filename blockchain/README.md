# aDappter
​
A Blockchain network for CO2 emission tracking.
​
> This is an interactive, distributed, network for CO2 emisson tracking. Data about household consumption is stored in the ledger, converted into CO2 emissions, and incentive tokens are distributed based on the achieved CO2 savings compared to the overall baseline of all households. These tokens can be used for reinvestment into sustainable projects of all kind.
​
This business network defines:
​
**Participants:**
`Consumer` `ProjectOwner`
​
**Assets:**
`Emission` `Project` `Token`
​
**Transactions:**
`CreateEmission` `assignToken` `getToken` `getAreaEmissions`
​
The `CreateEmission` function is called when an `CreateEmission` transaction is submitted from a particular household - the `Consumer`. The logic creates a new asset `Emission`, calculates the saved CO2 emissions in dollars in this household using the `CalculateEmission` function, and generates the `Token` asset for the respective `Consumer` on a 1:1 basis to dollars, calling the `GenerateToken` function.
​
Assumptions for the calulation of the CO2 emission:
1. Input: liters of conumed in oil per month (l) and living area (m^2)
2. Convert liters of oil into CO2: 100l = 0.319 tons of CO2
3. Compare to baseline, which is in this first version assumed as constant: baseline = 10 liters of oil / m^2 / year
4. Calculate the delta: consumption - baseline. Unit is tons of CO2 / m^2 / month. The baseline is equally distributed over 12 months in a year.
5. If the consumption is above the baseline: do nothing.
6. If the consumption is below the baseline: distribute tokens. 1 `Token` for 1 Dollar saved. Conversion: 1 ton CO2 = 40 dollars.
​
The `assignToken` function is called when a `assignToken` transaction is submitted for processing. With this function a `Consumer` can donate one or more `Token` to a `Project`. The logic checks that the project is still `Open`, the `Consumer` owns the needed funds, and assigns the chosen amount of `Token` to the project, handing back the not used `Token`'s when the needed amount for a project is reached. If a project has the full amount of `Token`'s, it will mark it as `Completed`and prevent further donations.
​
To test this Business Network Definition in the **Test** tab:
​
In the `Consumer` participant registry, create a new participant.
​
```
{
 "$class": "org.energy.network.Consumer",
 "consumerID": "C1",
 "zipCode": "8000",
 "flatArea": 100,
 "balance": 0,
 "assignedTokens": 0
}
```
​
In the `ProjectOwner` participant registry, create a participant.
​
```
{
 "$class": "org.energy.network.ProjectOwner",
 "ownerID": "Owner1",
 "Name": "Owner1"
}
```
​
In the `Project` asset registry, create a new asset of a project owned by `Owner1`. The needed amount of tokens to fund the project is 5.
​
```
{
 "$class": "org.energy.network.Project",
 "projectID": "P1",
 "projectTitle": "Project 1",
 "projectDescription": "A sustainable project",
 "projectBalance": 0,
 "tokensGoal": 5,
 "status": "Open",
 "owner": "resource:org.energy.network.ProjectOwner#Owner1"
}
```
​
Submit a new transaction `CreateEmission` for the household `C1`. They used 50 liters of oil this month.
​
```
{
 "$class": "org.energy.network.CreateEmission",
 "litersOil": 50,
 "owner": "resource:org.energy.network.Consumer#C1"
}
```
This creates a new asset `Emission`:
​
```
{
 "$class": "org.energy.network.Emission",
 "emissionID": "77096",
 "litersOil": 50,
 "delta": -0.0010633333333333332,
 "savedAmount": 4.253333333333333,
 "timeStamp": "2019-02-14T20:24:53.271Z",
 "baseLine": 0.0026583333333333333,
 "owner": "resource:org.energy.network.Consumer#C1"
}
```
This also created 4 new assets `Token` owned by `C1`, as they saved 4.25 dollars compared to the baseline this month. One of the tokens is for example:
​
```
{
 "$class": "org.energy.network.Token",
 "tokenID": "C1-33887",
 "owner": "resource:org.energy.network.Consumer#C1"
}
```
​
`C1` wants to spend now 3 `Token` for the project `P1`. For that, submit a new transaction `assignToken`:
​
```
{
 "$class": "org.energy.network.assignToken",
 "amountTokens": 3,
 "owner": "resource:org.energy.network.Consumer#C1",
 "assignedProject": "resource:org.energy.network.Project#P1"
}
```
​
The project `P1`is now updated to:
​
```
{
 "$class": "org.energy.network.Project",
 "projectID": "P1",
 "projectTitle": "Project 1",
 "projectDescription": "A sustainable project",
 "projectBalance": 3,
 "tokensGoal": 5,
 "status": "Open",
 "owner": "resource:org.energy.network.ProjectOwner#Owner1"
}
```
The token is now assigned to the project `P1`:
​
```
{
 "$class": "org.energy.network.Token",
 "tokenID": "C1-33887",
 "owner": "resource:org.energy.network.Consumer#C1",
 "assignedProject": "resource:org.energy.network.Project#P1"
}
```
​
The consumer was updated also:
​
```
{
 "$class": "org.energy.network.Consumer",
 "consumerID": "C1",
 "zipCode": "8000",
 "flatArea": 100,
 "balance": 1,
 "assignedTokens": 3
}
```
​

The transactions `getToken` queries all tokens and returns tokens owned by a specific `Consumer`. The transaction `getAreaEmissions` returns all emissions.

