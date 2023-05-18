import { View, Text } from "react-native";
import React, {
  Children,
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Form } from "types";
type FormContextType = {
  onToggleSaved: (form: Form) => void;
  isFormSaved: (form: Form) => boolean;
  savedForms: Form[];
};

const FormContext = createContext<FormContextType>({
  onToggleSaved: () => {},
  isFormSaved: () => false,
  savedForms: [],
});

interface Props {
  children: ReactNode;
}

const FormProvider = ({ children }: Props) => {
  const [savedForms, setSavedForms] = useState<Form[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadData();
  }, []); // load the data when the component mounts

  useEffect(() => {
    if (loaded) {
      persistData();
    }
  }, [savedForms]); // persist data every time it changes

  const areFormsTheSame = (a: Form, b: Form) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const isFormSaved = (form: Form) => {
    return savedForms.some((savedForm) => areFormsTheSame(savedForm, form));
  };
  const onToggleSaved = (form: Form) => {
    if (isFormSaved(form)) {
      // remove from saved
      setSavedForms((forms) =>
        forms.filter((savedForm) => !areFormsTheSame(savedForm, form))
      );
    } else {
      // add to saved
      setSavedForms((forms) => [form, ...forms]);
    }
  };
  const persistData = async () => {
    // write data to the local storage
    await AsyncStorage.setItem("formsData", JSON.stringify(savedForms));
  };

  const loadData = async () => {
    // read data from the local storage
    const dataString = await AsyncStorage.getItem("formsData");
    if (dataString) {
      const items = JSON.parse(dataString);
      setSavedForms(items);
    }
    setLoaded(true);
  };
  return (
    <FormContext.Provider value={{ onToggleSaved, isFormSaved, savedForms }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForms = () => useContext(FormContext);

export default FormProvider;
