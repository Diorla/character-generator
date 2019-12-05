import React from "react";
import { View, Text } from 'react-native';

import {oddCalculator, calculateWeight} from './../services';

import {
  maleHeight,
  femaleHeight,
  heightTypes,
  heightRangesOdd
} from "./../data/height";

import {
  weightTypes,
  weightRangesOdd
} from "./../data/weight";

import {
  xxTall,
  xTall,
  tall,
  medium,
  short,
  xShort,
  xxShort
} from './../services/calculateHeight';

const range = ['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'];

const HWeight=(props)=>{
  const { age, gender } = props;
  const { weight, height, weightCategory, heightCategory } = determineSize(age, gender);
  return (
    <View>
      <Text>{heightCategory}, about {height} cm</Text>
      <Text>{weightCategory}, about {weight} kg</Text>
    </View>
  )
}

const determineSize=(age, gender)=>{
  const heightType = oddCalculator(range, heightRangesOdd);
  const weightType = oddCalculator(range, weightRangesOdd);
  const heightCategory = heightTypes[heightType];
  const weightCategory = weightTypes[weightType];

  let height, genderHeight, weight;

  if(gender=="male") genderHeight=maleHeight[age]
  else genderHeight=femaleHeight[age]

  if(heightType=="xxl") height=xxTall(genderHeight);
  else if(heightType=="xl") height=xTall(genderHeight);
  else if(heightType=="l") height=tall(genderHeight);
  else if(heightType=="m") height=medium(genderHeight);
  else if(heightType=="s") height=short(genderHeight);
  else if(heightType=="xs") height=xShort(genderHeight);
  else  height=xxShort(genderHeight);

  weight=calculateWeight(weightType, height);

  return {
    weight,
    height,
    weightCategory,
    heightCategory
  }
}

export default HWeight;