"use client";
import { Button } from "@/components/ui/button";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { offerSubjectValidationSchema } from "./offerSubjectValidationSchema";
import { useEffect, useState } from "react";
import { ISubject } from "@/types";
import { getAllSubject } from "@/services/Subject";
import { dayArray } from "./offerSubjectConstant";
import { createOfferSubject } from "@/services/OfferSubject";

const CreateOfferSubjectModal = () => {
  const [subjectData, setSubjectData] = useState<ISubject[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [subjects] = await Promise.all([getAllSubject()]);
      setSubjectData(subjects?.data);
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof offerSubjectValidationSchema>>({
    resolver: zodResolver(offerSubjectValidationSchema),
    defaultValues: {
      subject: "",
      day: "",
      startTime: "",
      endTime: "",
      pricePerHour: "",
      maxCapacity: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const modifiedDataForBackEnd = {
      ...data,
      pricePerHour: Number(data?.pricePerHour),
      maxCapacity: Number(data?.maxCapacity),
    };

    console.log(modifiedDataForBackEnd);

    try {
      const res = await createOfferSubject(modifiedDataForBackEnd);

      if (res.success) {
        toast.success(res?.message || "Offer Subject is created successfully", {
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
          <Button variant="default" className="bg-blue-700 cursor-pointer">
            Add Offer Subject +
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Offer Subject</DialogTitle>
            <DialogDescription>
              Set subject details, timing, and pricing.
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
                  name="subject"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Offer Subject Name
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select subject name" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            {subjectData.map((item) => (
                              <SelectItem key={item?._id} value={item?._id}>
                                {item?.name}
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

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit" className="cursor-pointer">
                    {isSubmitting ? "Processing" : "Create"}
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

export default CreateOfferSubjectModal;
