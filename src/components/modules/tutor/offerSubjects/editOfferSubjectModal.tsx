"use client";

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { offerSubjectValidationSchemaforEdit } from "./offerSubjectValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { IOfferSubject } from "@/types";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dayArray } from "./offerSubjectConstant";
import { Input } from "@/components/ui/input";
import { updateOfferSubject } from "@/services/OfferSubject";
import { PenLine } from "lucide-react";
import { useState } from "react";
import ImagePreviewer from "./../../../ui/core/TLImage/ImagePreviewer";
import TLImageUploader from "@/components/ui/core/TLImage";

const EditOfferSubjectModal = ({
  id,
  offerSubjectData,
}: {
  id: string;
  offerSubjectData: IOfferSubject;
}) => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm<z.infer<typeof offerSubjectValidationSchemaforEdit>>({
    resolver: zodResolver(offerSubjectValidationSchemaforEdit),
    defaultValues: {
      day: offerSubjectData?.day || "",
      startTime: offerSubjectData?.startTime || "",
      endTime: offerSubjectData?.endTime || "",
      pricePerHour: String(offerSubjectData?.pricePerHour) || "",
      maxCapacity: String(offerSubjectData?.maxCapacity) || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const modifiedDataForBackEnd = {
      day: data?.day || offerSubjectData?.day,
      startTime: data?.startTime || offerSubjectData?.startTime,
      endTime: data?.endTime || offerSubjectData?.endTime,
      pricePerHour:
        Number(data?.pricePerHour) || Number(offerSubjectData?.pricePerHour),
      maxCapacity:
        Number(data?.maxCapacity) || Number(offerSubjectData?.maxCapacity),
    };

    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(modifiedDataForBackEnd));

      formData.append("file", imageFiles[0] as File);

      const res = await updateOfferSubject(id, formData);

      if (res.success) {
        toast.success(res?.message || "Offered Subject updated successfully", {
          id: toastId,
        });
        form.reset();
      } else {
        toast.error(res?.message || "Something went wrong!!!", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!!!", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <PenLine />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Offered Subject</DialogTitle>
            <DialogDescription>
              Update the details of the offered subject.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              action=""
              className="space-y-6"
            >
              <div className="space-y-1 text-sm">
                <Controller
                  name="day"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">Day</FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            {dayArray.map((item) => (
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

              <div className="space-y-1 text-sm">
                <Controller
                  name="startTime"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Start Time
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="HH:MM"
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

              <div className="space-y-1 text-sm">
                <Controller
                  name="endTime"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        End Time
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="HH:MM"
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

              <div className="space-y-1 text-sm">
                <Controller
                  name="pricePerHour"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Booking Price
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please enter booking price"
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

              <div className="space-y-1 text-sm">
                <Controller
                  name="maxCapacity"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Max Capacity
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please enter max Capacity"
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

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit" className="cursor-pointer">
                    {isSubmitting ? "Updating" : "Update"}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </FieldGroup>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditOfferSubjectModal;
