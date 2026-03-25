"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import z from "zod";
import { subjectValidationSchemaforUpdateSubjectStatus } from "./subjectValidationSchema";
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
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjectStatusArray } from "./subjectConstant";
import { updateSubjectStatus } from "@/services/Subject";

const UpdateSubjectStatusModal = ({ id }: { id: string }) => {
  const form = useForm<
    z.infer<typeof subjectValidationSchemaforUpdateSubjectStatus>
  >({
    resolver: zodResolver(subjectValidationSchemaforUpdateSubjectStatus),
    defaultValues: {
      isActive: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    if (data?.isActive === "Active") {
      data.isActive = true;
    }

    if (data?.isActive === "Inactive") {
      data.isActive = false;
    }

    console.log(data);

    try {
      const res = await updateSubjectStatus(id, data);

      if (res.success) {
        toast.success(res?.message || "Subject Status updated successfully", {
          id: toastId,
        });
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
          <Button className="block w-full text-start font-medium bg-transparent text-neutral-700 cursor-pointer hover:bg-blue-700 hover:text-white">
            Update Status
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Update Subject Status</DialogTitle>
            <DialogDescription>
              Edit and save changes to this subject.
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
                  name="isActive"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Subject Status
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            {subjectStatusArray.map((item) => (
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
                    {isSubmitting ? "Processing" : "Update"}
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

export default UpdateSubjectStatusModal;
