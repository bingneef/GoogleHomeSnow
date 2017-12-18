export const createReportSentence = ({resortname, resortcountry, lastsnow, lowersnow_cm, uppersnow_cm, conditions}) => {
  return `The current condition in ${resortname}, ${resortcountry} is ${conditions.toLowerCase()}. The last snowfall was ${lastsnow} and currently there is ${lowersnow_cm} centimeter at the base and ${uppersnow_cm} at the top.`
}
