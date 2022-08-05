# GalaxyBrainValidator
Permet de automatiquement débloquer le Galaxy Brain Achievement avec 2 compte

## requirement

- 2 github account (with their personal acces token) (Main user and Validator)
- node js (with npm)


## Comment Faire
- [Fork this repo with Main user Account](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository)  (*Not the octocat/Spoon-Knife repo*)
- [Enabling GitHub Discussions on your repository](https://docs.github.com/en/discussions/quickstart#enabling-github-discussions-on-your-repository)
- [Invite the Validator Account in Repo as Collaborator](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)
- [Creating a token with the 2 account](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token) (*With repo, user permission (Or more)*)
- Execte this with terminal
```bash
git clone https://github.com/ARKANYOTA/GalaxyBrainValidator.git
cd GalaxyBrainValidator
npm install
cp .env.structure .env
```

- Modify Varibale of `.env` file (He is hidden by default)
	- `SECRET_TOKEN`: Token of Main user Account
	- `SECRET_TOKEN_VALIDATOR_ACCOUNT`: Token of Validator Account
	- `OWNER`: Userame of Main User Account 
	- `REPO`: Name of the forked repository, Normally "GalaxyBrainValidator"
	- `TIER`: 32 (NoLevel x1: 2, Bronze x2:8, Argent x3: 16, Gold x4: 32)

- execute program
```bash
node index.js
```
