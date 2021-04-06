# react-native-quiz-true-false

![Single select](https://raw.githubusercontent.com/VolkenoMakers/react-native-quiz-true-false/main/demo.gif)

## Add it to your project

- Using NPM
  `npm install react-native-quiz-true-false`
- or:
- Using Yarn
  `yarn add react-native-quiz-true-false`

## Usage

```javascript
import React from "react";

import QuizeTrueFalse from "react-native-quiz-true-false";

const QuizTrueFalseApp = () => {
  const data = [
    {
      question:
        "Pendant la préhistoire, la période l’âge de la pierre polie a suivi l’age de la pierre taillée",
      answer: true,
    },
    {
      question:
        "Une personne qui parle couramment le français est un Francophone :",

      answer: true,
    },
    {
      question:
        "Quel petit signe place-t-on parfois sous la lettre C ? Une virgule",
      answer: false,
    },
  ];
  return (
    <QuizeTrueFalse
      containerStyle={{ backgroundColor: "#FFF", paddingTop: 30 }}
      questionTitleStyle={{ fontSize: 22, color: "#000" }}
      trueText="Vrai"
      falseText="Faux"
      textStyle={{ fontSize: 18, color: "#000" }}
      checkedColor={"#000"}
      uncheckedColor="#000"
      responseRequired={true}
      nextButtonText={"Next"}
      nextButtonStyle={{ backgroundColor: "#06d755" }}
      nextButtonTextStyle={{ color: "#FFF" }}
      prevButtonText={"Prev"}
      prevButtonStyle={{ backgroundColor: "#fa5541" }}
      prevButtonTextStyle={{ color: "#FFF" }}
      endButtonText={"Done"}
      endButtonStyle={{ backgroundColor: "#000" }}
      endButtonTextStyle={{ color: "#FFF" }}
      buttonsContainerStyle={{ marginTop: "auto" }}
      onEnd={(results) => {
        console.log(results);
      }}
      data={data}
    />
  );
};

export default QuizTrueFalseApp;
```

## Properties

| Property name             | Type       | Description                                           |
| ------------------------- | ---------- | ----------------------------------------------------- |
| **containerStyle**        | _Object_   | Custom style for the screen container                 |
| **questionTitleStyle**    | _Object_   | custom style for the title of the question            |
| **trueText**              | _String_   | default to True                                       |
| **falseText**             | _String_   | default to False                                      |
| **textStyle**             | _Object_   | custom style for the text                             |
| **checkedColor**          | _String_   | custom color for the checkbox if checked              |
| **uncheckedColor**        | _String_   | custom color for the checkbox if unchecked            |
| **responseRequired**      | _Boolean_  | make the answer mandatory if true. default to false   |
| **nextButtonText**        | _String_   | the text of the next button                           |
| **nextButtonStyle**       | _Object_   | Custom for the next button                            |
| **nextButtonTextStyle**   | _Object_   | Custom for the title of the next button               |
| **prevButtonText**        | _String_   | the text of the prev button                           |
| **prevButtonStyle**       | _Object_   | Custom for the prev button                            |
| **prevButtonTextStyle**   | _Object_   | Custom for the title of the prev button               |
| **endButtonText**         | _String_   | the text of the end button                            |
| **endButtonStyle**        | _Object_   | Custom for the end button                             |
| **endButtonTextStyle**    | _Object_   | Custom for the title of the end button                |
| **buttonsContainerStyle** | _Object_   | Custom for the container of the next and prev buttons |
| **onEnd**                 | _Function_ | Function to handle the end of the quiz                |

**ISC Licensed**
