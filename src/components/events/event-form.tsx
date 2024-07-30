"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { CgClose } from "react-icons/cg";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { eventDataSchema } from "@/lib/validations";
import { addEvent } from "@/src/actions/actions";
import { toast } from "sonner";

type FormDataProps = {
  name: string;
  slug: string;
  city: string;
  location: string;
  date: string;
  activities: string;
  time: string;
  description: string;
  imageUrl?: string; // Optional field
};

const EventForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    slug: "",
    city: "",
    location: "",
    date: "",
    activities: "",
    time: "",
    description: "",
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    if (name === "name") {
      newFormData.slug = value.trim().toLowerCase().replace(/\s+/g, "-");
    }
    setFormData(newFormData);
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const formattedDate = newValue.format("YYYY-MM-DD");
      setSelectedDate(newValue);
      setFormData({
        ...formData,
        date: formattedDate,
      });
      setShowCalendar(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", formData);

    // Validation
    const validatedEventData = eventDataSchema.safeParse(formData);
    if (!validatedEventData.success) {
      setError(validatedEventData.error.errors[0].message);
      console.log("Validation error:", validatedEventData.error.errors);
      return;
    }

    const result = await addEvent(validatedEventData.data);

    if (result.message === "Event added successfully") {
      toast.message(result.message);
      setError(null);
      setFormData({
        name: "",
        slug: "",
        city: "",
        location: "",
        date: "",
        activities: "",
        time: "",
        description: "",
      });
      setIsOpen(false);
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      {!isOpen ? (
        <div>
          <button
            onClick={handleOpen}
            className="bg-zinc-900 text-zinc-50 px-4 py-1 rounded"
          >
            Add Event
          </button>
        </div>
      ) : (
        <form
          className="absolute top-0 left-0 w-full h-screen bg-zinc-50 flex flex-col p-10 gap-10"
          onSubmit={handleSubmit}
        >
          <CgClose
            onClick={() => setIsOpen(false)}
            className="absolute top-[2%] left-[2%] text-zinc-900 text-4xl cursor-pointer"
          />
          <div className="max-w-[1024px] mx-auto flex flex-col gap-10">
            <h2 className="text-5xl self-center">Add Event</h2>
            <div className="flex">
              <div className="flex-1 flex flex-col gap-4 mr-4">
                {/* Left Column */}
                {Object.keys(formData).map((key) => {
                  if (key === "description" || key === "date") return null;
                  return (
                    <div key={key} className="w-full">
                      {key === "activities" ? (
                        <textarea
                          name={key}
                          value={formData[key as keyof FormDataProps]}
                          onChange={handleTextAreaChange}
                          placeholder="Activities (comma-separated)"
                          className="border border-solid border-zinc-900 p-2 rounded w-80 h-32"
                          required
                        />
                      ) : (
                        <input
                          type="text"
                          name={key}
                          value={formData[key as keyof FormDataProps]}
                          onChange={handleChange}
                          placeholder={
                            key.charAt(0).toUpperCase() + key.slice(1)
                          }
                          className="border border-solid border-zinc-900 p-2 rounded w-80"
                          required
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex-1 flex flex-col gap-4 ml-4">
                {/* Right Column */}
                <div className="w-full">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleTextAreaChange}
                    placeholder="Description"
                    className="border border-solid border-zinc-900 p-2 rounded w-80 h-32"
                    required
                  />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    value={
                      selectedDate
                        ? dayjs(selectedDate).format("DD.MM.YYYY")
                        : ""
                    }
                    onClick={() => setShowCalendar(true)}
                    readOnly
                    placeholder="Select Date"
                    className="border border-solid border-zinc-900 p-2 rounded w-80 cursor-pointer"
                    required
                  />
                  {showCalendar && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="rounded mt-2"
                      />
                    </LocalizationProvider>
                  )}
                </div>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {!showCalendar && (
                  <button
                    type="submit"
                    className="bg-zinc-900 text-zinc-50 px-4 py-1 rounded"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default EventForm;
