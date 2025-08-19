"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ParticipantSelector } from "./participant-selector";
import { GroupSelector } from "./group-selector";
import { CategorySelector } from "./category-selector";
import { SplitSelector } from "./split-selector";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { getAllCategories } from "@/lib/expense-categories";

// Form schema validation
const expenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Amount must be a positive number",
    }),
  category: z.string().optional(),
  date: z.date(),
  paidByUserId: z.string().min(1, "Payer is required"),
  splitType: z.enum(["equal", "percentage", "exact"]),
  groupId: z.string().optional(),
});

export function ExpenseForm({ type = "individual", onSuccess }) {
  const [participants, setParticipants] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [splits, setSplits] = useState([]);
  const [file, setFile] = useState(null);

  // Mutations and queries
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const createExpense = useConvexMutation(api.expenses.createExpense);
  const generateUploadUrl = useConvexMutation(api.storage.generateUploadUrl);

  const categories = getAllCategories();

  // Set up form with validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: "",
      category: "",
      date: new Date(),
      paidByUserId: currentUser?._id || "",
      splitType: "equal",
      groupId: undefined,
    },
  });

  // Watch for changes
  const amountValue = watch("amount");
  const paidByUserId = watch("paidByUserId");

  // Ensure current user is always a participant
  useEffect(() => {
    if (participants.length === 0 && currentUser) {
      setParticipants([
        {
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl,
        },
      ]);
    }
  }, [currentUser, participants]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const amount = parseFloat(data.amount);

      // Prepare splits
      const formattedSplits = splits.map((split) => ({
        userId: split.userId,
        amount: split.amount,
        paid: split.userId === data.paidByUserId,
      }));

      // Validate splits
      const totalSplitAmount = formattedSplits.reduce(
        (sum, split) => sum + split.amount,
        0
      );
      const tolerance = 0.01;
      if (Math.abs(totalSplitAmount - amount) > tolerance) {
        toast.error(`Split amounts don't add up to the total.`);
        return;
      }

      const groupId = type === "individual" ? undefined : data.groupId;

      // ✅ Upload bill if file is selected
      let billFileId = null;
      if (file) {
        const postUrl = await generateUploadUrl.mutate({});
        const uploadRes = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await uploadRes.json();
        billFileId = storageId;
      }

      // Create expense with bill reference
      await createExpense.mutate({
        description: data.description,
        amount: amount,
        category: data.category || "Other",
        date: data.date.getTime(),
        paidByUserId: data.paidByUserId,
        splitType: data.splitType,
        splits: formattedSplits,
        groupId,
        billFileId, // ✅ Save uploaded bill
      });

      toast.success("Expense created successfully!");
      reset();
      setFile(null);

      const otherParticipant = participants.find(
        (p) => p.id !== currentUser._id
      );
      const otherUserId = otherParticipant?.id;

      if (onSuccess) onSuccess(type === "individual" ? otherUserId : groupId);
    } catch (error) {
      toast.error("Failed to create expense: " + error.message);
    }
  };

  if (!currentUser) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Description & Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...register("description")} placeholder="Lunch, movie tickets, etc." />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" step="0.01" min="0.01" {...register("amount")} />
            {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
          </div>
        </div>

        {/* Category & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Category</Label>
            <CategorySelector
              categories={categories || []}
              onChange={(categoryId) => setValue("category", categoryId)}
            />
          </div>
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setValue("date", date);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* ✅ File Upload */}
        <div className="space-y-2">
          <Label htmlFor="bill">Upload Bill (optional)</Label>
          <Input
            id="bill"
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          {file && <p className="text-sm text-gray-600 mt-1">Selected: {file.name}</p>}
        </div>

        {/* Group or Individual */}
        {type === "group" ? (
          <div>
            <Label>Group</Label>
            <GroupSelector
              onChange={(group) => {
                if (!selectedGroup || selectedGroup.id !== group.id) {
                  setSelectedGroup(group);
                  setValue("groupId", group.id);
                  if (group.members) setParticipants(group.members);
                }
              }}
            />
          </div>
        ) : (
          <div>
            <Label>Participants</Label>
            <ParticipantSelector participants={participants} onParticipantsChange={setParticipants} />
          </div>
        )}

        {/* Paid By */}
        <div>
          <Label>Paid by</Label>
          <select
            className="w-full rounded-md border px-3 py-2 text-sm"
            {...register("paidByUserId")}
          >
            <option value="">Select who paid</option>
            {participants.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id === currentUser._id ? "You" : p.name}
              </option>
            ))}
          </select>
          {errors.paidByUserId && <p className="text-sm text-red-500">{errors.paidByUserId.message}</p>}
        </div>

        {/* Split Type */}
        <div>
          <Label>Split type</Label>
          <Tabs defaultValue="equal" onValueChange={(v) => setValue("splitType", v)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="equal">Equal</TabsTrigger>
              <TabsTrigger value="percentage">Percentage</TabsTrigger>
              <TabsTrigger value="exact">Exact</TabsTrigger>
            </TabsList>
            <TabsContent value="equal">
              <SplitSelector type="equal" amount={parseFloat(amountValue) || 0} participants={participants} paidByUserId={paidByUserId} onSplitsChange={setSplits} />
            </TabsContent>
            <TabsContent value="percentage">
              <SplitSelector type="percentage" amount={parseFloat(amountValue) || 0} participants={participants} paidByUserId={paidByUserId} onSplitsChange={setSplits} />
            </TabsContent>
            <TabsContent value="exact">
              <SplitSelector type="exact" amount={parseFloat(amountValue) || 0} participants={participants} paidByUserId={paidByUserId} onSplitsChange={setSplits} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || participants.length <= 1}>
          {isSubmitting ? "Creating..." : "Create Expense"}
        </Button>
      </div>
    </form>
  );
}
