---
name: proxied-npm-install
description: Use when running npm install or other npm registry fetch commands in this environment, where proxy_line and proxy_off aliases from ~/.zshrc must be enabled around the install step.
---

# Proxied npm install

## Overview

This environment defines `proxy_line` and `proxy_off` as zsh aliases in `~/.zshrc`. npm registry access may fail unless the install command runs inside an interactive zsh shell that can expand those aliases.

## When to Use

- `npm install` fails with `ENOTFOUND`, `network`, or registry access errors
- a task requires fetching packages from npm
- the command needs the `all_proxy` environment variable temporarily enabled

Do not use this skill for unrelated shell commands.

## Required Pattern

Run npm fetch commands inside interactive zsh and always disable the proxy afterward in the same shell:

```bash
zsh -ic 'proxy_line && npm install && proxy_off'
```

If npm still bypasses the proxy, mirror `all_proxy` into the standard npm proxy env vars:

```bash
zsh -ic 'proxy_line; export http_proxy=$all_proxy https_proxy=$all_proxy HTTP_PROXY=$all_proxy HTTPS_PROXY=$all_proxy; npm install; proxy_off; unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY'
```

## Rules

- Use `zsh -ic`, not plain `zsh -c`, because the aliases live in interactive shell config
- Keep `proxy_off` in the same command chain when the npm command succeeds
- If the npm command fails, report the exact failure instead of assuming the proxy is broken
- If the failure is `connect EPERM 127.0.0.1:8090`, the current sandbox is blocking access to the local proxy port; this workflow cannot succeed until the environment allows that connection
- Prefer this pattern only for npm-related network commands; avoid polluting unrelated commands with proxy state

## Quick Check

To verify alias expansion before a package install:

```bash
zsh -ic 'proxy_line; echo $all_proxy; proxy_off; echo ${all_proxy:-off}'
```
