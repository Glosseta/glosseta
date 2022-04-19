import pastDays from '../../../src/components/daily-word/past-days';

it("it returns past days of 1970", () => {
    const singleDay = 24 * 60 * 60 * 1000;

    const timeInJan1970 = singleDay * 5 + 30 * 60 * 1000;
    const dateInJan1970 = new Date(timeInJan1970);

    const timeIn1970 = singleDay * 98 + 154 * 60 * 1000;
    const dateIn1970 = new Date(timeIn1970);

    const timeAfter1970 = singleDay * 42195 + 23 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const date = new Date(timeAfter1970);

    expect(pastDays(dateInJan1970)).toBe(5);
    expect(pastDays(dateIn1970)).toBe(98);
    expect(pastDays(date)).toBe(42195);
})