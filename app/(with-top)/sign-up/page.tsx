/*
 * @Author: err0r
 * @Date: 2023-09-23 23:02:35
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-20 23:14:37
 * @Description:
 * @FilePath: \bee-channel-front\app\(with-none)\sign-up\page.tsx
 */
"use client";
import { signUp } from "@/api/auth";
import { fetchCode } from "@/api/auth";
import { verify } from "@/api/checkcode";
import { FormParams, SignUpKeyParams } from "@/types/auth";
import { Button, Input, Link, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const [isFinished, setIsFinshed] = useState(false);
  const [codeSource, setCodeSource] = useState({ source: "", key: "" });
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
      code: "",
    },
  });

  useEffect(() => {
    fetchCode(setCodeSource);
  }, []);

  const formMap: FormParams[] = [
    {
      label: "Email",
      type: "text",
      name: "email",
      placeholder: "enter your email",
      error: "please enter correct email",
      rule: {
        required: true,
        pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
      },
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "enter your password",
      error: "must be 10 to 20 letters, including upper and lower case",
      rule: {
        required: true,
        pattern: /[A-Za-z0-9]{10,20}/,
      },
    },
    {
      label: "Confirm",
      type: "password",
      name: "confirm",
      placeholder: "confirm your password",
      error: "must be same as the password",
      rule: {
        required: true,
        validate: (inputValue: string) => {
          return inputValue === getValues("password");
        },
      },
    },
    {
      label: "Code",
      type: "text",
      name: "code",
      placeholder: "enter the code",
      error: "code error",
      rule: {
        required: true,
      },
    },
  ];

  const onSubmit = (data: any) => {
    verify(codeSource.key, data.code, () => {
      setError("code", new Error(formMap[3].error));
    })
      .then(() => {
        return signUp({
          key: codeSource.key,
          code: data.code,
          email: data.email,
          password: data.password,
        });
      })
      .then((res) => {
        if (res.code === 1001) {
          setError("email", res.msg);
          fetchCode(setCodeSource);
        } else if (res.code === 1002) {
          setError("code", res.msg);
          fetchCode(setCodeSource);
        } else if (res.code === 200) {
          setIsFinshed(true);
        } else {
          fetchCode(setCodeSource);
        }
      })
      .catch((error) => {
        fetchCode(setCodeSource);
      });
  };

  return (
    <div className="flex gap-48 justify-center">
      <Image
        removeWrapper
        className="w-96 h-96 min-w-[384px] self-center"
        src="/video_streaming.svg"
        alt="mojap"
      />
      {isFinished ? (
        <div className="flex flex-col justify-center min-h-[600px]">
          <h1 className="text-3xl ">
            Thanks for Signing up, please check your email!
          </h1>
        </div>
      ) : (
        <div className="max-w-[350px] w-[350px] flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <p className="text-4xl">Sign up</p>
            <p className="text-default-400 mt-4">
              Already have an account?
              <Link
                href="/sign-in"
                className="text-yellow-500 ml-2 cursor-pointer"
              >
                Sign in
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-4 flex flex-col gap-2">
              {formMap.map(
                (item, index) =>
                  index !== formMap.length - 1 && (
                    <Input
                      autoComplete="off"
                      key={index}
                      className="mb-6"
                      classNames={{
                        label: "text-md",
                        input: "pl-2",
                        inputWrapper: "h-12 mt-1",
                        errorMessage: "absolute",
                      }}
                      fullWidth
                      isClearable
                      type={item.type}
                      label={item.label}
                      labelPlacement="outside"
                      placeholder={item.placeholder}
                      errorMessage={
                        errors[item.name as SignUpKeyParams] && item.error
                      }
                      {...register(item.name as SignUpKeyParams, item.rule)}
                    />
                  )
              )}
              <div className="flex mt-2">
                <Input
                  className="mb-6 w-3/5"
                  classNames={{
                    label: "text-lg",
                    input: "text-md pl-2",
                    inputWrapper: "h-12 ",
                  }}
                  fullWidth
                  isClearable
                  label={formMap[formMap.length - 1].name}
                  labelPlacement="outside"
                  placeholder={formMap[formMap.length - 1].placeholder}
                  errorMessage={
                    errors.code && formMap[formMap.length - 1].error
                  }
                  {...register("code", formMap[formMap.length - 1].rule)}
                />
                <Image
                  removeWrapper
                  onClick={() => fetchCode(setCodeSource)}
                  className="ml-4 h-12 w-2/5 object-fill"
                  alt="verify code"
                  src={codeSource.source}
                />
              </div>

              <Button
                type="submit"
                className="mt-1 h-12 bg-gradient-to-tr from-pink-500 to-yellow-500	text-white shadow-lg"
                fullWidth
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
