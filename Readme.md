[FA](/blob/main/Readme.fa.md)

## Question: Can we organize online referendum without government help?

There is a suggestion let's consider it together so please feel free to open issues or create PRs.

### How it works

This repository includes a [react application](https://wercyrus.github.io/gior/) which gets user's information and user's vote and creates four keys as following

- privateKey = sha(random) + vote
- publicKey = sha(privateKey)
- tpKey = sha(random)
- verifyKey = sha(random)

When a user press the send button

- tpKey and verifyKey will be sent to TP1(First ThirdParty)
- personal informations will be sent to TP2
- tpKey and publicKey will be sent to TP3

Vote and privatekey doesn't send to anywhere so users have to keep the privateKey somewhere safe

After that the TP1 asks users about their relatives and how they connect with others and tries to remove suspecious profiles or bots using the answers
for example it asks users to enter verifyKey of their father or ...

The TP2 tries to identify users by the personal information and they may call or text users to be more accurate
we expect TP2 to create a black lists of tpKeys

The TP1 will publish a list of verified tpKey\
Then the TP2 will filter it and publish filtered verified tpKeys\
After that the TP3 will publish a list of publicKeys match with filtered verified tpKeys

Now we are able to collect private keys from people and a private key which match with any valid public key in the published list will be a valid private key and the vote in it, is countable.

#### Why we need those three independent third parties

- TP1 and TP2 prevents fake users and bots
- TP2 also prevents TP1 of adding fake users, the result of TP2 is a black list so it would be testable
- TP3 make us sure that no one will known users vote even after collecting privateKeys

#### Do you want to be one of the third parties?

Please make your changes and create a PR.
