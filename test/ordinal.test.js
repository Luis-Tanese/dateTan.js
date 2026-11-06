const assert = require("node:assert/strict");
const { dateTan } = require("../dateTan");

const expectedOrdinals = [
    "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
    "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th",
    "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th",
    "31st",
];

const failures = [];
for (let day = 1; day <= 31; day += 1) {
    // Construct a local date at noon so the tested calendar day is TZ-stable.
    const date = new Date(2024, 0, day, 12, 0, 0);
    const expectedOrdinal = expectedOrdinals[day - 1];
    const expectedIsoDate = `2024-01-${String(day).padStart(2, "0")}`;
    const single = dateTan(date, "Do", "en-us");
    const chained = dateTan(date, ["Do", "YYYY-MM-DD"], "en-us");

    if (single !== expectedOrdinal) {
        failures.push(`day ${day} single Do: expected ${expectedOrdinal}, got ${single}`);
    }
    if (chained[0] !== expectedOrdinal) {
        failures.push(`day ${day} array Do: expected ${expectedOrdinal}, got ${chained[0]}`);
    }
    if (chained[1] !== expectedIsoDate) {
        failures.push(`day ${day} array YYYY-MM-DD: expected ${expectedIsoDate}, got ${chained[1]}`);
    }
}

assert.deepEqual(failures, [], failures.join("\n"));

const frenchFirstDay = new Date(2024, 0, 1, 12, 0, 0);
const frenchNinthDay = new Date(2024, 11, 9, 12, 0, 0);
assert.equal(dateTan(frenchFirstDay, "Do", "fr-fr"), "1er");
assert.equal(dateTan(frenchNinthDay, "Do", "fr-fr"), "9e");

console.log("Ordinal regression passed for English days 1–31 and French date ordinals.");
