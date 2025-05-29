import React, { JSX } from "react";
import { TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  imagem?: JSX.Element;
  text?: string;
  styles?: string;
};

export const Input = (Props: InputProps) => {
  const { imagem, text, styles, ...rest } = Props;

  return (
    <View className="flex-row w-[95%] items-center border border-blue-500 rounded-2xl h-12 px-3 bg-white shadow-md mb-4">
      {imagem && (
        <View className="justify-center items-center mr-2">
          {imagem}
        </View>
      )}
      <TextInput className={`flex-1 ${styles}`} placeholder={text} placeholderTextColor="#888" {...rest}/>
    </View>
  );
};
