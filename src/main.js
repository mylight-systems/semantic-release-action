const core = require('@actions/core');

try {
  core.debug('Run semantic-release');
} catch (error) {
  core.setFailed(error.message);
}
