"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
const AddServer = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = () => {
    const existingApiKeys = JSON.parse(localStorage.getItem("apiKeys") || "[]");
    if (apiKey.length === 134) {
      const updatedApiKeys = [...existingApiKeys, { name, apiKey }];

      localStorage.setItem("apiKeys", JSON.stringify(updatedApiKeys));
    } else {
      toast({
        variant: "destructive",
        title: "Invalid ApiKey",
        description: "ApiKey must be 134 characters long.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }

    setName("");
    setApiKey("");
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 ">
            +
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="1.1.1.1"
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Api key
              </Label>
              <Input
                id="api key"
                className="col-span-3"
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => {handleSubmit()}} >
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddServer;
