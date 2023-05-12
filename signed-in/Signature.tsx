import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";

import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import { Appbar } from "react-native-paper";

const Signature = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [data, setData] = React.useState(null);
  const signatureView = useRef<SignatureViewRef>({} as SignatureViewRef);
  // signatureView.current.changePenSize(10,20)

  const saveSign = () => {
    signatureView.current.readSignature();
  };

  const resetSign = () => {
    signatureView.current.clearSignature();
    setData(null);
  };

  const onSave = function (signature) {
    // setData(`data:image/png;base64,${result.encoded}`);
    // signatureView.current.show(false);
    // navigation.navigate({
    //   name: route.params?.routeName,
    //   params: { image: signature },
    //   merge: true,
    // });
    //we well add the signature to the redux store
  };

  const style = `
    .m-signature-pad {
      margin:auto;
      top:0;
    }
    body,html {
    width: ${windowWidth}px; height: ${windowHeight}px;
      .m-signature-pad--footer {display: none; margin: 0px;}`;
  return (
    <View style={{ flex: 1 }}>
      <Appbar mode="small">
        <Appbar.Content title="Signature" />
        <Appbar.Action icon="content-save" onPress={saveSign} />
        <Appbar.Action icon="delete-outline" onPress={resetSign} />
      </Appbar>
      <View style={{ height: windowHeight, width: windowWidth }}>
        <SignatureScreen
          ref={signatureView}
          onBegin={() => setScrollEnabled(false)}
          onEnd={() => setScrollEnabled(true)}
          onOK={onSave}
          // dataURL={route.params?.image}
          webStyle={style}
        />
      </View>
    </View>
  );
};

export default Signature;

const styles = StyleSheet.create({});
