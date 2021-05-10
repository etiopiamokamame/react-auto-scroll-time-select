# react-auto-scroll-time-select

A select box that supports typescript.
You can select options that are separated by time.
Automatically scrolls to choices that match the entered value.

[Demo Site](https://etiopiamokamame.github.io/demo-react-auto-scroll-time-select/)

## Installation

```sh
$ yarn add react-auto-scroll-time-select react-custom-scrollbars
```

## Usage

```tsx
import Select, { OptionType } from "react-auto-scroll-time-select";

<Select onChange={setOption} value={option} />;
```

## Export Types

| Name            | Type                                |
| :-------------- | :---------------------------------- |
| OptionType      | { label: string; value: string; }   |
| InputValueType  | string &#124; null &#124; undefined |
| StyleConfigType | { [key: string]: any }              |

## Props

| Prop                     | Default      | Type                                                 | Detail                                                      |
| :----------------------- | :----------- | :--------------------------------------------------- | :---------------------------------------------------------- |
| span                     | 30 (minutes) | number                                               | Choice time interval                                        |
| hourLimit                | 24 (hours)   | number                                               | Limit time                                                  |
| value                    |              | OptionType &#124; null                               | The time you have selected                                  |
| onChange                 |              | (option: OptionType &#124; null) => void;            | Select change event                                         |
| findOption               |              | (option: OptionType, input: InputValueType) => void; | An event that finds options to scroll from input characters |
| isClearable              | true         | boolean                                              | If true, display the button to clear                        |
| styles                   |              | { select, control, ... }                             | See [Custom Style](#custom-styles)                          |
| menuPortalTarget         |              |                                                      | Element to add selection menu                               |
| defaultScrollOptionValue |              | string                                               | Default display value                                       |
| hideOptions              | []           | string[]                                             | Specify options to hide                                     |

## Custom Styles

### Examples

```tsx
<Select
  styles={{
    select: (config: StyleConfigType) => ({
      ...config,
      width: 200,
    }),
    control: () => ({}),
  }}
/>
```

### Styles Props

| props                | Detail                 |
| :------------------- | :--------------------- |
| select               | Select box outline     |
| control              | Select box inner frame |
| inputForm            | input field            |
| clearValue           | Clear button           |
| dropDownArrowWrapper | Dropdown outline       |
| dropDownArrowItem    | Dropdown items         |
| selectOptions        | Selection menu outline |
| optionMenu           | Selection menu items   |

## Full Custom Example

```tsx
import React, { useState, useEffect } from "react";
import Select, {
  OptionType,
  InputValueType,
  StyleConfigType,
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
      styles={{
        select: (config: StyleConfigType) => ({
          ...config,
          width: 500,
        }),
        control: (config: StyleConfigType) => ({
          ...config,
          width: 500,
        }),
        inputForm: (config: StyleConfigType) => ({
          ...config,
          width: "100%",
          backgroundColor: "#d69a9a",
        }),
        clearValue: (config: StyleConfigType) => ({
          ...config,
          width: 30,
          backgroundColor: "#000000",
          color: "white",
        }),
        dropDownArrowWrapper: (config: StyleConfigType) => ({
          ...config,
          width: 50,
          backgroundColor: "#a1a8b7",
          "&:hover > div": {
            borderColor: "rgba(255, 0, 0, 0.5) transparent transparent",
          },
        }),
        dropDownArrowItem: (config: StyleConfigType) => ({
          ...config,
          borderColor: "#a73c3c transparent transparent",
        }),
        selectOptions: (config: StyleConfigType) => ({
          ...config,
          width: 600,
          backgroundColor: "#000000",
        }),
        optionMenu: (config: StyleConfigType) => ({
          ...config,
          color: "green",
        }),
      }}
      menuPortalTarget={document.body}
      defaultScrollOptionValue="09:00"
      hideOptions={["00:00"]}
    />
  );
};

export default App;
```

## License

MIT
