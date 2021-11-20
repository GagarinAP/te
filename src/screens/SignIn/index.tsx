import React from "react";
import { View, TextInput, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components/native";
import colors from "assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { signInRequest } from "store/auth";
import { authLoadingSelector } from "store/auth/selectors";

const SignInSchema = Yup.object().shape({
  code: Yup.string().test("code", "Too Short!", (code = "") => code.length > 5),
  password: Yup.string().test("password", "Too Short!", (password = "") => password?.length > 5),
});

type TypeValues = {
  code: string;
  password: string;
};

const initialValues: TypeValues = {
  code: "",
  password: "",
};

const Detail = () => {
  const loading = useSelector(authLoadingSelector);
  const dispatch = useDispatch();
  const handleSubmit = (values: TypeValues) => dispatch(signInRequest(values));
  return (
    <Container>
      <Title>Please login</Title>
      <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={handleSubmit}>
        {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <InputView>
              <Placeholder>Code</Placeholder>
              <Input
                keyboardType="numeric"
                placeholder="Enter your code"
                onChangeText={handleChange("code")}
                onBlur={handleBlur("code")}
                value={values.code}
              />
            </InputView>
            <InputView>
              <Placeholder>Password</Placeholder>
              <Input
                keyboardType="numeric"
                placeholder="Enter your password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </InputView>
            <Touchable disabled={Boolean(errors?.code) || Boolean(errors?.password)} onPress={handleSubmit}>
              <View>
                <TextLogin>LOG IN</TextLogin>
              </View>
              {loading && (
                <Loading>
                  <ActivityIndicator color={colors.white} />
                </Loading>
              )}
            </Touchable>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default Detail;

const Loading = styled.View`
  position: absolute;
  right: 20px;
`;

const Container = styled.View`
  padding: 100px 20px;
`;

const TextLogin = styled.Text`
  color: ${colors.white};
  font-size: 18px;
`;

const Touchable = styled.TouchableOpacity`
  opacity: ${({ disabled }: { disabled: boolean }) => (disabled ? 0.3 : 1)};
  height: 40px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.black};
`;

const InputView = styled.View`
  margin-top: 20px;
`;

const Input = styled(TextInput)`
  height: 40px;
  padding: 0 10px;
  background-color: ${colors.primary200};
`;

const Title = styled.Text`
  font-size: 18px;
  color: ${colors.black};
  font-weight: 500;
  text-align: center;
`;

const Placeholder = styled.Text`
  font-size: 14px;
  color: ${colors.black};
  font-weight: 500;
`;
