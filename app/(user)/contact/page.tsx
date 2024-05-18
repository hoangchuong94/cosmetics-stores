"use client";

import Background from "@/components/background";
import backgroundImage1 from "@/public/static/bg-06.jpg";
import backgroundImage2 from "@/public/static/banner-04.jpg";
import { MapPin, Mail, Phone } from "lucide-react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ContactPage() {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "name must be at least 2 characters.",
    }),
    email: z.string().min(2, {
      message: "name must be at least 2 characters.",
    }),
    message: z.string().min(2, {
      message: "name must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  return (
    <div className="p-5">
      <Background
        title="new in town"
        name="The New Beauty Collection"
        description="This new collection brings with it the most exciting lorem ipsum dolor sit a met."
        image={backgroundImage1}
      />

      <div className="flex flex-col md:flex-row pt-10">
        <div className="md:w-6/12 py-10 px-5 font-sans flex flex-col">
          <h2 className="text-4xl">Contact Us</h2>
          <p className="py-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id leo
            tempor, congue justo at, lobortis orci.
          </p>
          <div className="flex my-2">
            <MapPin className="mr-4" />
            <p>123 Fifth Avenue, New York, NY 10160</p>
          </div>
          <div className="flex my-2">
            <Mail className="mr-4" />
            <p>contact@info.com</p>
          </div>
          <div className="flex my-2">
            <Phone className="mr-4" />
            <p>9-334-7565-9787</p>
          </div>
        </div>
        <div className="md:w-6/12 p-20 bg-[#f6edf0] rounded-md">
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name "
                        {...field}
                        className="border border-gray-950/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                        className="border border-gray-950/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your message"
                        {...field}
                        className="border border-gray-950/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>

      <div className="pt-10">
        <Background
          title="new in town"
          name="The New Beauty Collection"
          description="This new collection brings with it the most exciting lorem ipsum dolor sit a met."
          image={backgroundImage2}
          fixed
        />
      </div>
    </div>
  );
}
