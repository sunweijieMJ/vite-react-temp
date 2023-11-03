const fs = require('fs');
const { execSync } = require('child_process');

// 获取提交信息
COMMIT_MESSAGE_FILE = process.argv[2];
COMMIT_MESSAGE = fs.readFileSync(COMMIT_MESSAGE_FILE, 'utf8');

// 定义正则
COMMIT_REGEXP =
  /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)((.+))?: .{1,100}/;

if (!COMMIT_REGEXP.test(COMMIT_MESSAGE)) {
  console.log('请使用yarn commit!');
  process.exit(1);
}

// commitlint校验
try {
  execSync(`npx --no-install commitlint --edit ${COMMIT_MESSAGE_FILE}`);
} catch (error) {
  console.error('Failed to execute Commitlint:', error);
}

// cspell校验
// # cat $1 | npx cspell --no-progress --no-summary stdin
