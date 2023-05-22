import JsonStringify from "@/utils/JsonStringify";
import { locales } from "@/utils/locales";
import { Translation, language_code } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: any;
}

export default function TextTranslationsInputValue(props: Props) {
  const [realValue, setRealValue] = useState<string>();
  const [actualValues, setActualValues] = useState<any>({});

  useEffect(() => {
    const values: any = {};
    props.value.Translations.map((translation: Translation) => {
      values[translation.language_code] = translation.text;
    });

    setActualValues(values);
  }, []);

  useEffect(() => {
    const values: any[] = [];

    locales.map((locale) => {
      const value = document.getElementById(`${props.name}-${locale}`) as HTMLInputElement;
      console.log(props.value);
      if (value) {
        values.push({
          text_id: props.value.Translations[0].text_id,
          language_code: language_code[locale as keyof typeof language_code],
          text: value.value,
        });
      }
    });

    setRealValue(JsonStringify(values));
  }, [actualValues]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const oldValues = actualValues;
    oldValues[locales.indexOf(e.target.id.split("-")[1])] = e.target.value;
    setActualValues(oldValues);
  };
  const value: Text & { Translations: Translation[] } = props.value;

  return (
    <div>
      {locales.map((locale) => (
        <div key={locale}>
          <label htmlFor={props.name}>
            {props.name} {locale}
          </label>
          <input type="text" name={`${props.name}-${locale}`} id={`${props.name}-${locale}`} value={actualValues[locale]} onChange={handleOnChange} />
        </div>
      ))}
      <input type="hidden" name={props.name} id={props.name} value={realValue} />
    </div>
  );
}
