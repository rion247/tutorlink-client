"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllSubject } from "@/services/Subject";
import { ISubject } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const OfferedSubjectSearchBox = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const { data: subjectData } = await getAllSubject();

        setSubjects(subjectData);
      } catch (err: any) {
        toast.error(err?.message || "Something went wrong!!!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const form = useForm({ defaultValues: { subject: "" }, mode: "onChange" });

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const handleSearchFunction = async (id: string) => {
    params.set("subject", id.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClearSearchFunction = async () => {
    params.delete("subject");
    router.push(`${pathname}`, { scroll: false });
  };

  return (
    <div className="flex justify-end container mx-auto p-12">
      {!isLoading && (
        <div>
          <form action="" className="space-y-6 ">
            <div className="flex justify-center items-center gap-2 max-w-md">
              <div className="text-sm">
                <Controller
                  name="subject"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Select
                        value={field.value}
                        onValueChange={(val) => {
                          handleSearchFunction(val);
                        }}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
                          aria-invalid={fieldState.invalid}
                          className="min-w-30"
                        >
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned">
                          {subjects.map((item: ISubject) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="cursor-pointer"
                onClick={handleClearSearchFunction}
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OfferedSubjectSearchBox;
