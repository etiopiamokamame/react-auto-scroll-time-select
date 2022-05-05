import { OptionType, InputValueType } from "../../types";

export const generateOptions = (
  start: number,
  hourLimit: number,
  span: number,
  hideOptions: string[]
): OptionType[] => {
  const candidates: number[] = Array.from({
    length: hourLimit * 60 + 1,
  })
    .map((_, i) => i)
    .filter((n) => n % span === 0 && n >= start);

  return candidates
    .map((candidate) => {
      const h = Math.floor(candidate / 60);
      const m = candidate - h * 60;
      const option = `${format(h)}:${format(m)}`;

      return {
        label: option,
        value: option,
      };
    })
    .filter(({ value }) => hideOptions.indexOf(value) < 0);
};

const format = (num: number) => ("0" + num).slice(-2);

export const defaultFindOption = (
  { value }: OptionType,
  inputValue: InputValueType
) => {
  if (inputValue) {
    if (inputValue.indexOf(":") < 0) {
      if (inputValue.length <= 2) {
        return value.indexOf(inputValue + ":") > -1;
      } else {
        return value.replace(":", "").indexOf(inputValue) > -1;
      }
    } else {
      return value.indexOf(inputValue) > -1;
    }
  } else {
    return false;
  }
};
