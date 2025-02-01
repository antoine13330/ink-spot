'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import AutoSelectCustom from "@/components/ui/auto-select";
import { Hash } from "lucide-react";
interface FormData {
    title: string;
    content: string;
    hashtags: string;
    images: FileList;
    appointmentable: boolean;
    appointmentPrice?: number;
    appointmentDuration?: number;
}

const createPostSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(10),
    hashtags: z.string().min(3),
    images: z.array(z.string()).min(1),
    appointmentable: z.boolean(),
    appointmentPrice: z.number().optional(),
    appointmentDuration: z.number().optional(),
});


type CreatePostData = z.infer<typeof createPostSchema>;

export default function CreatePage() {
    const form = useForm<CreatePostData>({
        resolver : zodResolver(createPostSchema),
        defaultValues: {
            title: "",
            content: "",
            hashtags: "",
            images: [],
            appointmentable: false,
            appointmentPrice: 0,
            appointmentDuration: 0,
        },
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values : CreatePostData) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("content", values.content);
            formData.append("hashtags", values.hashtags);
            formData.append("appointmentable", values.appointmentable.toString());
            if ( values.appointmentable ) {
                if (values.appointmentPrice) {
                    formData.append("appointmentPrice", values.appointmentPrice.toString());
                }
                if (values.appointmentDuration) {
                    formData.append("appointmentDuration", values.appointmentDuration.toString());
                }
            }
            for (let i = 0; i < values.images.length; i++) {
                formData.append("images", values.images[i]);
            }
            
            const res = await fetch("/api/posts/create-post", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                router.push("/");
            } else {
                console.error("Failed to create post");
            }
        } catch (error) {
            console.error("Error:", error);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-4 sm:max-w-lg md:max-w-2xl">
            {
                form.formState.errors.title && (
                    <div className="text-red-500">{form.formState.errors.title.message}</div>
                )
            }
            {
                form.formState.errors.content && (
                    <div className="text-red-500">{form.formState.errors.content.message}</div>
                )
            }
            {
                form.formState.errors.hashtags && (
                    <div className="text-red-500">{form.formState.errors.hashtags.message}</div>
                )
            }
            {
                form.formState.errors.images && (
                    <div className="text-red-500">{form.formState.errors.images.message}</div>
                )
            }
            {
                form.formState.errors.appointmentable && (
                    <div className="text-red-500">{form.formState.errors.appointmentable.message}</div>
                )
            }
            {
                form.formState.errors.appointmentPrice && (
                    <div className="text-red-500">{form.formState.errors.appointmentPrice.message}</div>
                )
            }
            {
                form.formState.errors.appointmentDuration && (
                    <div className="text-red-500">{form.formState.errors.appointmentDuration.message}</div>
                )
            }


            <Card>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField name="title" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="content" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Content" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
    
                            <FormField name="hashtags" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hashtags</FormLabel>
                                    <FormControl>
                                        <>
                                        <AutoSelectCustom
                                            data={[{id: 1, name: "test", description: "1m po"}]}
                                            dataKey="id"
                                            textKey="name"
                                            additionalTextKey="description"
                                            placeholder="Add a hashtag"
                                            icon={<Hash/>}
                                        />
                                        <Input hidden className="sr-only" {...field} />
                                        </>
                                      
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="images" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        {/* <Input type="file" multiple {...field} /> */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="appointmentable" control={form.control} render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                    <FormLabel>Enable Appointments</FormLabel>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {form.watch("appointmentable") && (
                                <>
                                    <FormField name="appointmentPrice" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Price" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField name="appointmentDuration" control={form.control} render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration (min)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Duration (min)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </>
                            )}

                            <Button type="submit" disabled={loading}>
                                {loading ? "Posting..." : "Create Post"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
