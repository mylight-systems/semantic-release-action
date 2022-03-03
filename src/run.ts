import * as core from '@actions/core';
import semanticRelease from 'semantic-release';

import { Output } from './constants';

export async function run(): Promise<void> {
  const release = await semanticRelease({});

  if (!release) {
    core.info('No release published');

    core.setOutput(Output.PUBLISHED, false);

    return;
  }

  const { lastRelease, nextRelease, commits } = release;

  core.info(
    `Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`
  );

  if (lastRelease.version) {
    core.info(`The last release was "${lastRelease.version}".`);
  }

  const { type, version, gitTag, notes, channel } = nextRelease;
  const [major, minor, patch] = version.split('.');

  core.setOutput(Output.PUBLISHED, true);
  core.setOutput(Output.TYPE, type);
  core.setOutput(Output.VERSION, version);
  core.setOutput(Output.MAJOR, major);
  core.setOutput(Output.MINOR, minor);
  core.setOutput(Output.PATCH, patch);
  core.setOutput(Output.GIT_TAG, gitTag);
  core.setOutput(Output.NOTES, notes);
  core.setOutput(Output.CHANNEL, channel);
}
