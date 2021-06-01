import React from "react";
import { ViewStyle } from "react-native";
import { TextStyle } from "react-native";
import { View, Text, Dimensions, Animated } from "react-native";
import { CheckBox } from "react-native-elements";
import { OppButton } from "./Buttons";
const { width } = Dimensions.get("window");

type ItemProps = {
  question: string;
  answer: boolean;
};
interface QuizTrueFalseProps {
  containerStyle: ViewStyle;
  questionTitleStyle: TextStyle;
  trueText: string;
  falseText: string;
  checkedColor: string;
  uncheckedColor: string;
  textStyle: TextStyle;
  nextButtonText: string;
  nextButtonStyle: ViewStyle;
  nextButtonTextStyle: TextStyle;
  endButtonText: string;
  endButtonStyle: ViewStyle;
  endButtonTextStyle: TextStyle;
  prevButtonText: string;
  prevButtonStyle: ViewStyle;
  prevButtonTextStyle: TextStyle;
  buttonsContainerStyle: ViewStyle;
  responseRequired: boolean;
  onEnd: (results: Array<any>) => any;
  data: Array<ItemProps>;
}
const QuizTrueFalse = ({
  containerStyle,
  questionTitleStyle,
  trueText = "True",
  falseText = "False",
  checkedColor = "#0AD1BF",
  uncheckedColor = "#0AD1BF",
  textStyle,
  nextButtonText,
  nextButtonStyle,
  nextButtonTextStyle,
  endButtonText,
  endButtonStyle,
  endButtonTextStyle,
  prevButtonText,
  prevButtonStyle,
  prevButtonTextStyle,
  buttonsContainerStyle,
  responseRequired,
  onEnd,
  data,
}: QuizTrueFalseProps) => {
  const originalData = data;
  const [questions, setQuestions] = React.useState([
    ...originalData.sort((_) => Math.random() - 0.5),
  ]);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const animation = React.useRef(new Animated.Value(0)).current;

  const onAnswer = React.useCallback(
    (_, response) => {
      const newQuestions = [...questions];
      const activeQuestion: any = { ...newQuestions[currentIndex] };
      activeQuestion.response = response;
      newQuestions[currentIndex] = activeQuestion;
      setQuestions(newQuestions);
    },
    [questions]
  );
  const onNext = React.useCallback(() => {
    if (currentIndex === questions.length - 1) {
      handleEnd(questions);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, questions]);
  const onPrev = React.useCallback(() => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);
  const handleEnd = React.useCallback(
    (questions) => {
      let newData = [];
      for (let q of questions) {
        newData.push({
          question: q.question,
          response: q.response,
          isRight: q.answer === q.response,
          answer: q.answer,
        });
      }
      onEnd(newData);
    },
    [questions]
  );
  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: currentIndex,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);
  const translateX = animation.interpolate({
    inputRange: questions.map((_, index) => index),
    outputRange: questions.map((_, index) => -index * width),
  });
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;
  let nextDisabled = responseRequired
    ? ![true, false].includes(questions[currentIndex]?.response)
    : false;
  return (
    <View
      style={[
        { flex: 1, backgroundColor: "#FFF", paddingHorizontal: 15 },
        containerStyle,
      ]}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          width: questions.length * width,
          transform: [{ translateX }],
        }}
      >
        {questions.map((item, index) => (
          <View key={index} style={{ alignSelf: "center", width: width }}>
            <Question
              questionTitleStyle={questionTitleStyle}
              key={index}
              onAnswer={onAnswer}
              {...{
                item,
                checkedColor,
                uncheckedColor,
                textStyle,
                trueText,
                falseText,
              }}
            />
          </View>
        ))}
      </Animated.View>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 15,
            alignSelf: "center",
            width: width - 50,
            justifyContent: "space-between",
          },
          buttonsContainerStyle,
        ]}
      >
        <OppButton
          onPress={() => {
            onPrev();
          }}
          disabled={isFirst}
          containerStyle={{
            width: "40%",
            backgroundColor: "#F00",
            ...prevButtonStyle,
          }}
          title={prevButtonText}
          titleStyle={[{ color: "#FFF" }, prevButtonTextStyle]}
        />
        <OppButton
          onPress={() => {
            onNext();
          }}
          disabled={nextDisabled}
          containerStyle={{
            width: "40%",
            backgroundColor: "#000",
            ...(isLast ? endButtonStyle : nextButtonStyle),
          }}
          title={isLast ? endButtonText : nextButtonText}
          titleStyle={[
            { color: "#FFF" },
            isLast ? endButtonTextStyle : nextButtonTextStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default QuizTrueFalse;

type QuestionProps = {
  item: any;
  onAnswer: Function;
  questionTitleStyle: TextStyle;
  checkedColor: string;
  uncheckedColor: string;
  textStyle: TextStyle;
  trueText: string;
  falseText: string;
};
function Question({
  item,
  onAnswer,
  questionTitleStyle,
  checkedColor,
  uncheckedColor,
  textStyle,
  trueText,
  falseText,
}: QuestionProps) {
  return (
    <View style={{ marginTop: 30, width: width - 50, alignItems: "center" }}>
      <Text
        style={[
          { textAlign: "center", fontWeight: "700", fontSize: 18 },
          questionTitleStyle,
        ]}
      >
        {item.question}
      </Text>
      <View
        style={{
          marginVertical: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomCheckbox
          value={item.response === true}
          title={trueText}
          onChange={(val) => {
            if (val) {
              onAnswer(item, true);
            } else {
              onAnswer(item, null);
            }
          }}
          {...{ textStyle, checkedColor, uncheckedColor }}
        />
        <CustomCheckbox
          value={item.response === false}
          title={falseText}
          onChange={(val) => {
            if (val) {
              onAnswer(item, false);
            } else {
              onAnswer(item, null);
            }
          }}
          {...{ textStyle, checkedColor, uncheckedColor }}
        />
      </View>
    </View>
  );
}
type CustomCheckboxProps = {
  title: string;
  value: boolean;
  uncheckedColor: string;
  checkedColor: string;
  textStyle: TextStyle;
  onChange: Function;
};
function CustomCheckbox({
  title,
  value,
  uncheckedColor,
  checkedColor,
  textStyle,
  onChange,
}: CustomCheckboxProps) {
  return (
    <CheckBox
      center
      checkedIcon="check-box"
      uncheckedIcon="check-box-outline-blank"
      iconType="material"
      title={title}
      iconRight
      containerStyle={{
        borderColor: "transparent",
        backgroundColor: "transparent",
        margin: 0,
      }}
      textStyle={[
        { fontSize: 18, color: "#000", fontWeight: "400" },
        textStyle,
      ]}
      onPress={() => onChange(!value)}
      uncheckedColor={uncheckedColor}
      checkedColor={checkedColor}
      checked={value}
    />
  );
}
