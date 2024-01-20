# GalaxyBrainValidator
EN: Allows automatically unlocking the Galaxy Brain Achievement with 2 accounts.
FR: Permet de débloquer automatiquement le Galaxy Brain Achievement avec 2 comptes.

## Requirements

- 2 github account (with their personal acces token) (Main user and Validator)
- node js (with npm)


## How to
- [Fork this repo with Main user Account](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository)  (*Not the octocat/Spoon-Knife repo*)
- [Enabling GitHub Discussions on your repository](https://docs.github.com/en/discussions/quickstart#enabling-github-discussions-on-your-repository)
- [Invite the Validator Account in Repo as Collaborator](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)
- [Creating a token with the 2 account](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token) (*With repo, user permission (Or more)*)
- Execute this in the terminal
```bash
git clone https://github.com/ARKANYOTA/GalaxyBrainValidator.git
cd GalaxyBrainValidator
npm install
cp .env.structure .env
```

- Modify variables in the `.env` file (It is hidden by default)
	- `SECRET_TOKEN`: Token of the Main user account
	- `SECRET_TOKEN_VALIDATOR_ACCOUNT`: Token of the Validator account
	- `OWNER`: Username of the Main User account 
	- `REPO`: Name of the forked repository, Normally "GalaxyBrainValidator"
	- `TIER`: 32 (NoLevel x1: 2, Bronze x2:8, Argent x3: 16, Gold x4: 32)
 		- (⚠️ Doing the 32 validations at the same time has a good chance of causing the program to crash around the 20th iteration. You just have to wait a little then restart the program a second time with the number of remaining iterations.)

- Execute the program
```bash
node index.js
```
