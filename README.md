# Euphony
A music manager

Look up artists you like or albums you own and add them to your list.

# Software required to run the project
1. Node
2. MongoDB

# Steps to run the project
1. yarn install
2. yarn start

# Production build
1. yarn install
2. yarn run prod

**Please Note:** this repo cannot simply be run after cloning for security purposes. It requires the creation of a file at the top level called `config.json`, which is used to keep API keys so it is not part of the repository. Below a sample working config.json.
```
{
    "crypto": {
        "secret": "io23tzm8ek9d7fjhwi0sejhrgw4ersjdfoq03mweoi42hg0siojg"
    },
    "discogs": {
        "key": "PTfRSmfQJeEGMuZNgHFg",
        "secret": "hEbfRPUgkdatVWYlJpIfRGsAttxARUaC"
    },
    "expressSession": {
        "secret": "lkehg5r8hgh3iqsbso93ikdgh650u4sfg89dhsogsd09fy4p98dg0"
    },
    "mailgun": {
        "apiKey": "105373d87a3545c0a73a4e14826a6f6b-9949a98f-853bb6b5",
        "domain": "sandbox466024ba4ee540859c3edb5296dd049b.mailgun.org"
    }
}
```

Then go to localhost:3000
