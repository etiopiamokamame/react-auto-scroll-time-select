# react-auto-scroll-time-select

A select box that supports typescript.
You can select options that are separated by time.
Automatically scrolls to choices that match the entered value.

## Installation

```sh
$ yarn add react-auto-scroll-time-select emotion react-custom-scrollbars @types/react-custom-scrollbars
```

## Usage

```tsx
import Select, { OptionType } from "react-auto-scroll-time-select";

<Select onChange={setOption} value={option} />;
```

## Export Types

| Name           | Type                                |
| :------------- | :---------------------------------- |
| OptionType     | { label: string; value: string; }   |
| InputValueType | string &#124; null &#124; undefined |

## Props

| Prop        | Default      | Type                                                 | Detail                                                      |
| :---------- | :----------- | :--------------------------------------------------- | :---------------------------------------------------------- |
| span        | 30 (minutes) | number                                               | Choice time interval                                        |
| hourLimit   | 24 (hours)   | number                                               | Limit time                                                  |
| value       |              | OptionType &#124; null                               | The time you have selected                                  |
| onChange    |              | (option: OptionType &#124; null) => void;            | Select change event                                         |
| findOption  |              | (option: OptionType, input: InputValueType) => void; | An event that finds options to scroll from input characters |
| isClearable | true         | boolean                                              | If true, display the button to clear                        |

## Full Custom Example

```tsx
import React, { useState, useEffect } from "react";
import Select, {
  OptionType,
  InputValueType,
} from "react-auto-scroll-time-select";

const App = () => {
  const [option, setOption] = useState<OptionType | null>();

  useEffect(() => {
    console.log(option);
  }, [option]);

  return (
    <Select
      onChange={setOption}
      value={option}
      span={15}
      hourLimit={33}
      findOption={(option: OptionType, inputValue: InputValueType) =>
        option.value === inputValue
      }
      isClearable={false}
    />
  );
};

export default App;
```

## License

MIT
