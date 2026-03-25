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
import { zodResolver } from "@hookform/resolvers/zod";
import { subjectValidationSchema } from "./subjectValidationSchema";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  subjectCategoriesArray,
  subjectGradeLevelArray,
} from "./subjectConstant";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { createSubject } from "@/services/Subject";

const CreateSubjectModal = () => {
  const form = useForm<z.infer<typeof subjectValidationSchema>>({
    resolver: zodResolver(subjectValidationSchema),
    defaultValues: {
      name: "",
      category: "",
      gradeLevel: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const modifiedDataForBackEnd = { ...data };

    console.log(modifiedDataForBackEnd);

    try {
      const res = await createSubject(modifiedDataForBackEnd);

      if (res.success) {
        toast.success(res?.message || "Subject created successfully", {
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
            Add Subject +
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Subject</DialogTitle>
            <DialogDescription>
              Add a new subject to the system.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              action=""
              className="space-y-6"
            >
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Subject Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Please enter subject name"
                      autoComplete="off"
                      className="w-full px-4 py-3 rounded-md border-gray-400 text-gray-900  focus:border-violet-400"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="space-y-1 text-sm">
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Category
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            {subjectCategoriesArray.map((item) => (
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
                  name="gradeLevel"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Grade
                      </FieldLabel>
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
                            {subjectGradeLevelArray.map((item) => (
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

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit" className="cursor-pointer">
                    {isSubmitting ? "Processing" : "Submit"}
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

export default CreateSubjectModal;
