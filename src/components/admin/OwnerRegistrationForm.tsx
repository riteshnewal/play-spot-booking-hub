
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  ownerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  contactNumber: z.string().min(10, { message: "Please enter a valid contact number." }),
  whatsappNumber: z.string().min(10, { message: "Please enter a valid WhatsApp number." }),
  groundName: z.string().min(2, { message: "Ground name must be at least 2 characters." }),
  groundAddress: z.string().min(5, { message: "Please provide a valid address." }),
  supportedSports: z.array(z.string()).min(1, { message: "Select at least one sport." }),
  facilities: z.array(z.string()),
  description: z.string().optional(),
});

const sportsOptions = [
  { id: "cricket", label: "Cricket" },
  { id: "football", label: "Football" },
  { id: "tennis", label: "Tennis" },
  { id: "badminton", label: "Badminton" },
  { id: "volleyball", label: "Volleyball" },
  { id: "basketball", label: "Basketball" },
];

const facilityOptions = [
  { id: "water", label: "Drinking Water" },
  { id: "gents-toilet", label: "Gents Toilet" },
  { id: "ladies-toilet", label: "Ladies Toilet" },
  { id: "changing-room", label: "Changing Room" },
  { id: "cafeteria", label: "Cafeteria" },
  { id: "parking", label: "Parking" },
  { id: "floodlights", label: "Floodlights" },
];

interface OwnerRegistrationFormProps {
  onRegistrationComplete?: () => void;
}

export default function OwnerRegistrationForm({ onRegistrationComplete }: OwnerRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      password: "",
      contactNumber: "",
      whatsappNumber: "",
      groundName: "",
      groundAddress: "",
      supportedSports: [],
      facilities: [],
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would make an API call to register the owner
      console.log("Owner registration data:", values);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Owner registered successfully",
        description: `${values.ownerName} has been registered as a ground owner.`,
      });
      
      form.reset();
      
      if (onRegistrationComplete) {
        onRegistrationComplete();
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error registering the owner. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Register New Ground Owner</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
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
                    <Input type="email" placeholder="owner@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter WhatsApp number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="groundName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ground Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ground name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="groundAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ground Address</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter full address" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="supportedSports"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Supported Sports</FormLabel>
                  <FormDescription>
                    Select all sports that can be played on this ground
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {sportsOptions.map((sport) => (
                    <FormField
                      key={sport.id}
                      control={form.control}
                      name="supportedSports"
                      render={({ field }) => (
                        <FormItem
                          key={sport.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(sport.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, sport.id]);
                                } else {
                                  field.onChange(
                                    field.value?.filter(
                                      (value) => value !== sport.id
                                    )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {sport.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="facilities"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Available Facilities</FormLabel>
                  <FormDescription>
                    Select all facilities available at the ground
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {facilityOptions.map((facility) => (
                    <FormField
                      key={facility.id}
                      control={form.control}
                      name="facilities"
                      render={({ field }) => (
                        <FormItem
                          key={facility.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(facility.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, facility.id]);
                                } else {
                                  field.onChange(
                                    field.value?.filter(
                                      (value) => value !== facility.id
                                    )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {facility.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter any additional details about the ground" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register Owner"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
