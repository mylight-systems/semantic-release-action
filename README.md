# Semantic Release Action

![Release](https://github.com/mylight-systems/semantic-release-action/workflows/Release/badge.svg)
![@latest](https://img.shields.io/github/package-json/v/mylight-systems/semantic-release-action?label=%40latest)

> Runs semantic-release and exports variables to use in subsequent actions

## Usage

### Basic usage

```yml
steps:
  - uses: actions/checkout@v3

  - uses: mylight-systems/semantic-release-action@v1
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Using outputs variables

```yml
steps:
  - uses: actions/checkout@v3

  - uses: mylight-systems/semantic-release-action@v1
    id: release
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

  - run: echo ${{ steps.release.outputs.version }}

  - run: echo "$OUTPUTS"
    env:
      OUTPUTS: ${{ toJson(steps.release.outputs) }}
```

### Only run a step if a new release was published

```yml
steps:
  - uses: actions/checkout@v3

  - uses: mylight-systems/semantic-release-action@v1
    id: release
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

  - if: steps.release.outputs.published == 'true'
    run: |
      echo "A new release was published with tag ${TAG}"
    env:
      TAG: ${{ steps.release.outputs.git-tag }}
```

## Outputs

- `published` - Either `'true'` when a new release was published or `'false'` when no release was published
- `type` - The new releases' type, either `'patch'`, `'minor'` or `'major'`
- `version` - The new releases' semantic version, i.e. `'1.8.3'`
- `major` - The new releases' major version number, i.e. `'1'`
- `minor` - The new releases' minor version number, i.e. `'8'`
- `patch` - The new releases' patch version number, i.e. `'3'`
- `git-tag` - The new releases' Git tag, i.e. `'v1.8.3'`
- `notes` - The new releases' notes
- `channel` - The new releases' distribution channel (undefined for the default distribution channel), i.e. `'beta'`

## License

[MIT](LICENSE.md)
