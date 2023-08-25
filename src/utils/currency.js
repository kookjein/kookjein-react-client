export const moneyFormat = (value) => {
  const numbers = [
    numbering(value % 100000000000000000000, 10000000000000000),
    numbering(value % 10000000000000000, 1000000000000),
    numbering(value % 1000000000000, 100000000),
    numbering(value % 100000000, 10000),
    value % 10000,
  ];

  return setUnitText(numbers)
    .filter((number) => !!number)
    .join(" ");
};

const setUnitText = (numbers) => {
  const unit = ["", "만", "억", "조", "경"];
  return numbers.map((number, index) =>
    !!Math.round(number) ? numberFormat(Math.round(number)) + unit[unit.length - 1 - index] : Math.round(number)
  );
};

const numbering = (value, division) => {
  const result = Math.floor(value / division);
  return result === 0 ? null : result % division;
};

const NUMBER_FORMAT_REGX = /\B(?=(\d{3})+(?!\d))/g;

const numberFormat = (value) => {
  return value.toString().replace(NUMBER_FORMAT_REGX, ",");
};
