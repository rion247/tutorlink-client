"use client";
import { useUser } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import z from "zod";
import { StudentFormSchemaForCreate } from "./studentValidation";
import {
  StudentRegistration,
  verifyGoogleRecaptcha,
} from "@/services/AuthService";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gradeLevelArray } from "./studentConstant";
import ImagePreviewer from "@/components/ui/core/TLImage/ImagePreviewer";
import TLImageUploader from "@/components/ui/core/TLImage";

const StudentRegistrationForm = () => {
  const [reCaptCha, setReCaptcha] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const { setIsLoading } = useUser();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");

  const router = useRouter();

  const form = useForm<z.infer<typeof StudentFormSchemaForCreate>>({
    resolver: zodResolver(StudentFormSchemaForCreate),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      contactNo: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleGoogleRecaptcha = async (value: string | null) => {
    try {
      const res = await verifyGoogleRecaptcha(value!);

      if (res?.success) {
        setReCaptcha(true);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging...");

    const modifiedDataForBackEnd = {
      email: data?.email,
      password: data?.password,
      student: {
        name: { firstName: data?.firstName, lastName: data?.lastName },
        contactNo: data?.contactNo,
        gradeLevel: data?.gradeLevel,
        address: data?.address,
      },
    };

    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(modifiedDataForBackEnd));
      formData.append("file", imageFiles[0] as File);
      const res = await StudentRegistration(formData);

      setIsLoading(true);

      if (res?.success) {
        toast.success(res?.message, { id: toastId });

        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message, { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Join as a Student</CardTitle>
        <CardDescription>
          Sign up to find qualified tutors, book sessions, and start learning
          today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          action=""
          className="space-y-6"
        >
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      First Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="w-full px-4 py-3 rounded-md border-gray-400 text-gray-900  focus:border-violet-400"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Last Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="w-full px-4 py-3 rounded-md border-gray-400 text-gray-900  focus:border-violet-400 col-span-full sm:col-span-3"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3 relative">
              <Controller
                name="gradeLevel"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Grade</FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Grade" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          {gradeLevelArray.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <Controller
                name="contactNo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Contact No
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="w-full px-4 py-3 rounded-md border-gray-400 text-gray-900  focus:border-violet-400 col-span-full sm:col-span-3"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="">
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Home Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    className="w-full px-4 py-3 rounded-md border-gray-400 text-gray-900  focus:border-violet-400"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    className="w-full px-4 py-3 rounded-md border-gray-400 text-gray-900  focus:border-violet-400"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    className="w-full px-4 py-3 rounded-md border-gray-400 text-gray-900  focus:border-violet-400"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-8">
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            ) : (
              <div className="">
                <TLImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Uploaded Profile Image"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY as string}
              onChange={handleGoogleRecaptcha}
            />
          </div>
          <Button
            type="submit"
            className={`block w-full text-center rounded-sm text-white uppercase ${reCaptCha === false ? "bg-gray-600" : "bg-indigo-700"}  font-bold tracking-wide cursor-pointer hover:bg-indigo-600`}
            disabled={reCaptCha ? false : true}
          >
            {isSubmitting ? "Processing" : "Register"}
          </Button>
        </form>
      </CardContent>

      <p className="text-xs  text-center sm:px-6 text-gray-700">
        Already have an account?
        <Link
          rel="noopener noreferrer"
          href="/login"
          className="underline text-blue-500 font-semibold ml-1 hover:text-blue-700"
        >
          Login Now
        </Link>
      </p>
    </Card>
  );
};

export default StudentRegistrationForm;
