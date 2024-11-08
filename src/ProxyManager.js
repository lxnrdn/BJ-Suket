require('colors');
const axios = require('axios');
const fs = require('fs');

const PROXY_SOURCES = {
  'BJ 1': 'https://gist.githubusercontent.com/lxnrdn/77d36f6be2bfd730d381ebc66367a48f/raw/6b87b2b37999ac8f77c362443eead30df1ad7f47/gistfile1.txt',
  'BJ 2': 'https://gist.githubusercontent.com/lxnrdn/9fd1adba2bedf12f737c75c7ce511e56/raw/93899b5abf1e81be34df7d839b2ee960528fc8a8/gistfile1.txt',
  'BJ 3': 'https://gist.githubusercontent.com/lxnrdn/e8050b9ffed405a89260d136a74f6163/raw/e48bbfcf0af5d8bbf16737b3d1c21c992fa63c2f/gistfile1.txt',
};

async function fetchProxies(url) {
  try {
    const response = await axios.get(url);
    console.log(`\nFetched proxies from ${url}`.green);
    return response.data.split('\n').filter(Boolean);
  } catch (error) {
    console.error(`Failed to fetch proxies from ${url}: ${error.message}`.red);
    return [];
  }
}

async function readLines(filename) {
  try {
    const data = await fs.promises.readFile(filename, 'utf-8');
    console.log(`Loaded data from ${filename}`.green);
    return data.split('\n').filter(Boolean);
  } catch (error) {
    console.error(`Failed to read ${filename}: ${error.message}`.red);
    return [];
  }
}

async function selectProxySource(inquirer) {
  const choices = [...Object.keys(PROXY_SOURCES), 'CUSTOM', 'NO PROXY'];
  const { source } = await inquirer.prompt([
    {
      type: 'list',
      name: 'source',
      message: 'Select proxy source:'.cyan,
      choices,
    },
  ]);

  if (source === 'CUSTOM') {
    const { filename } = await inquirer.prompt([
      {
        type: 'input',
        name: 'filename',
        message: 'Enter the path to your proxy.txt file:'.cyan,
        default: 'proxy.txt',
      },
    ]);
    return { type: 'file', source: filename };
  } else if (source === 'NO PROXY') {
    return { type: 'none' };
  }

  return { type: 'url', source: PROXY_SOURCES[source] };
}

module.exports = { fetchProxies, readLines, selectProxySource };
