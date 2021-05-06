# Batch unfollow

Unfollow everyone on Github.

## Usage

Clone this repository:

```sh
git clone git@github.com:joao-alberto/batch-unfollow.git
```

Create `.env` file by copying the sample

```sh
cp .env.sample
```

Create your Github PAT (Personal access token) [here](https://github.com/settings/tokens) selecting `user` scope.

![Select user scope](https://github.com/joao-alberto/batch-unfollow/blob/main/assets/user_scope.png?raw=true)

Edit `.env` and add your generated PAT in `GITHUB_API_TOKEN` variable.
