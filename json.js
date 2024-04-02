import { resolve } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

/**
 * @typedef {Object.<string, string[]>} Words
 */

/** @type {string} */
const INPUT_FILE = resolve("./public/data.json");
const OUTPUT_FILE = resolve("./public/output.json");


/**
 * Fetches JSON data from a specified file.
 * @returns {Promise<Words>} A promise that resolves with the JSON data.
 */
const getJSON = async () => {
  return await readFile(INPUT_FILE, { encoding: 'utf8' })

};

/**
 * Orders the JSON data into a specific format.
 * @param {Words} data - The JSON data to be ordered.
 * @returns {Promise<Record<string, string[]>>} A promise that resolves with the ordered data.
 */
const orderJSON = async (data) => {
  const newData = {};
  const ALL = "All Words";
  newData[ALL] = []

  for (const key in data) {
    const words = new Set(data[key]);
    const wordsArray = Array.from(words);
    newData[key] = wordsArray;
    newData[ALL] = [...newData[ALL], ...wordsArray];
  }

  newData[ALL] = Array.from(new Set(newData[ALL]));

  return newData;
};

/**
 * Executes the process of fetching and ordering JSON data.
 * Logs the ordered data to the console.
 * @returns {void}
 */
const run = async () => {
    console.info("...Ordering The Data")
    const res = await getJSON();
    const data = await orderJSON(JSON.parse(res));
    await writeFile(OUTPUT_FILE, JSON.stringify(data, null) + "\n", { encoding: 'utf8' })
    console.info("✅ Data minified and Formatted into the Ouput File")
};

run();

