"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FileUpload } from "@/components/file-upload";
export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formSchema = z.object({
    name: z.string().min(1, {
      message: "服务器名称是必填项!",
    }),
    imageUrl: z.string().min(1, {
      message: "图片链接是必填项!",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center tracking-widest">
            定制您的专属服务器
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            为您的服务器赋予一个有个性的名字和头像。您可以随时更改它。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mt-8 mb-8 px-6">
              <div className="flex items-center justify-center text-center mb-8">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary/70">
                    <FormLabel>服务器名称</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="请 输 入 服 务 器 名 称 ^_^"
                          {...field}
                        />
                        {form.formState.errors.name && (
                          <p className="text-red-500 text-right">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button
                variant="primary"
                disabled={isLoading}
                className="text-bold text-white tracking-widest"
              >
                创 建
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
